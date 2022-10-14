const VOID_TAGS = [
	// List from: https://riptutorial.com/html/example/4736/void-elements
	'title',
    'div',
    'p',
    'b',
    'html',
    'body',
    'header',
    'font',
    'h1',
    'h2',
    'h3',
    'h4',
    'a',
    'span',
    'head',
    'ul',
    'li',
    'strong',
	'footer',
	'section',
	'table',
	'thread',
	'tr',
	'th',
	'td'
];
var num_tag=new Array();
num_tag["title"]=0
num_tag["div"]=0
num_tag["p"]=0
num_tag["b"]=0
num_tag["html"]=0
num_tag["body"]=0
num_tag["header"]=0
num_tag["font"]=0
num_tag["h1"]=0
num_tag["h2"]=0
num_tag["h3"]=0
num_tag["h4"]=0
num_tag["a"]=0
num_tag["span"]=0
num_tag["head"]=0
num_tag["ul"]=0
num_tag["li"]=0
num_tag["strong"]=0
num_tag["footer"]=0
num_tag["section"]=0
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
	let non = true;
	var num=0
	function parse_content(cursor) {
		let run = true;
		while (run && input.length > 0) {

			const success = 

				// Parse a comment node:
				pull(/^<!--((?:[^-]|-(?!->|\/))*)-->/, comment => {
				
				})
				
				//Parse a tag
				||pull(/^<([\!]*[a-zA-Z][a-zA-Z0-9\-\:]*)/, text => {
				var tag=text		
				var attributes_class1=""

					const new_tag = {tag,num,text, attributes_class1, children: [] };
					if (VOID_TAGS.includes(text.toLowerCase())) {
						
						//cursor.children.push(new_tag);
						non = true;
						parse_attributes(new_tag);
						parse_content(new_tag);
					}
					else
						{
							non = false;
							parse_attributes(new_tag);
							if(text=="script")
							{
								pull(/^([^<]+|\n)/, comment => {})
								pull(/^((?!<\/script>).|\n)*/, comment => {})
								pull(/<\/script>/, comment => {});
							}
						}
			})
			
			// Parse close tag
			|| pull(/^<[\/]*([a-zA-Z][a-zA-Z0-9\-\:]*)>/, tag => {
				if (cursor.text == tag) {
					
					run = false;
				}
			})

			// Parse a text node
			|| pull(/^([^<]+)/, text => {
				var id="text"
				var tag=cursor.text
				
				var attributes_class=cursor.attributes_class1
                text=text.replace(/\n/g,"")
                text=text.replace(/\t/g,"")
				text=text.replace(/\s/g,"")
				if(non&&!text=="")
				{
					num++
					root.children.push({
						tag,num,text,attributes_class
					});
				}
				
			})

			if (!success) {
			
				throw new Error("Parse error");
			}
		}
	}
	function parse_attributes(cursor) {
        var id="";
        var class1="";
		while(pull(/^[\s\:]*([a-zA-Z][a-zA-Z0-9\-\_\s\:]*)="([^"]*)"/, (
			name,
			value
		) => {
	
            if(name.includes("id"))
			{
			id= value;
            }
            else if(name.includes("class")){
                class1=value;
            }
		})
		|| pull(/^\s+([a-zA-Z][a-zA-Z0-9\-\_\s]*)="([\/^"]*)"/, (
			name,
			value
		) => {
            if(name.includes("id"))
			{
			id= value;
            }
            else if(name.includes("class")){
                class1=value;
            }
		})
		|| pull(/^\s+([a-zA-Z][a-zA-Z0-9\-\_\s]*)=([^>]+)/, (
			name,
			value
		) => {
			if(name.includes("id"))
			{
			id= value;
            }
            else if(name.includes("class")){
                class1=value;
            }
		})) {}
		if(non)
        	cursor.attributes_class1=class1;
		if (!(pull(/^\s*\/*>/)||pull(/^[a-zA-Z0-9\-\_\s]+>/))) {
			//cursor.attributes["123"] = "Malformed open tag";
			//throw new Error("Malformed open tag");
		}
	}
	num_tag["title"]=0
	num_tag["div"]=0
	num_tag["p"]=0
	num_tag["b"]=0
	num_tag["html"]=0
	num_tag["body"]=0
	num_tag["header"]=0
	num_tag["font"]=0
	num_tag["h1"]=0
	num_tag["h2"]=0
	num_tag["h3"]=0
	num_tag["h4"]=0
	num_tag["a"]=0
	num_tag["span"]=0
	num_tag["head"]=0
	num_tag["ul"]=0
	num_tag["li"]=0
	num_tag["strong"]=0
	num_tag["footer"]=0
	num_tag["section"]=0
	while( input.length > 0)
	{
		parse_content(root);
	}
	return root.children;
}