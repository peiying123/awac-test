const VOID_TAGS = [
	// List from: https://riptutorial.com/html/example/4736/void-elements
	'area',
	'base',
	'br',
	'hr',
	'img',
	'input',
	'link',
	'meta',
	'param',
	'command',
	'keygen',
	'source'
];

function parse_html(input) {
	const root = { children: [] };
	function pull(regex, handler = () => {}) {
		const match = regex.exec(input);
		if (match !== null) {
			const [full_match, ...captures] = match;
			input = input.substr(full_match.length);
			handler(...captures);
			return true;
		} else {
			return false;
		}
	}
	function parse_content(cursor) {
		let run = true;
		let non = true;
		while (run && input.length > 0) {
			// Parse an open tag
			const success = pull(/^<([a-zA-Z][a-zA-Z0-9\-\:]*)/, tag => {
				const new_tag = { tag, attributes: {}, children: [] };
				console.log(new_tag)
				//cursor.children.push(new_tag);
				//parse_attributes(new_tag);
				if (!VOID_TAGS.includes(tag.toLowerCase())) {
					cursor.children.push(new_tag);
					parse_attributes(new_tag);
					parse_content(new_tag);
					non = true;
				}
				else
					non = false;
			})
			// Parse a comment node:
			|| pull(/^<!--((?:[^-]|-(?!->))*)-->/, comment => {
				cursor.children.push({
					comment
				})
			})
			// Parse close tag
			|| pull(/^<\/([a-zA-Z][a-zA-Z0-9\-\:]*)>/, tag => {
				if (cursor.tag !== tag) {
					console.log("Unmatched close tag")
					throw new Error("Unmatched close tag");
				}
				run = false;
			})
			// Parse a text node
			|| pull(/^([^<]+)/, text => {
				if(non) {
					cursor.children.push({
						text
				});}
			});
			/*if (!success) {
				console.log("Parse error")
				throw new Error("Parse error");
			}*/
		}
	}
	function parse_attributes(cursor) {
		while(pull(/^\s+([a-zA-Z][a-zA-Z0-9\-\_\s]+)="([^"]*)"/, (
			name,
			value
		) => {
			console.log(name)
			cursor.attributes[name] = value;
		})
		|| pull(/^\s+([a-zA-Z][a-zA-Z0-9\-\_\s]+)=([^>]+)/, (
			name,
			value
		) => {
			console.log(name)
			cursor.attributes[name] = value;
		})) {}
		if (!pull(/^\s*\/*>/)) {
			console.log("Malformed open tag")
			throw new Error("Malformed open tag");
		}
	}
	parse_content(root);
	return root.children;
}