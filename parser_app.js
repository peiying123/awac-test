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
	'section'
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
	function parse_content(cursor) {
		let run = true;
		
        //let i=236000
		while (run && input.length > 0) {
			
			// Parse an open tag
           
            //console.log(input.length)
            //i--
			const success = pull(/^<([\!]*[a-zA-Z][a-zA-Z0-9\-\:]*)/, text => {
				var tag=text
				var id=text
				var num=0
				if (VOID_TAGS.includes(text.toLowerCase())) {
					num_tag[tag]++;
					//console.log(num_tag[tag])
					num=num_tag[tag]
				}
				
				const new_tag = {id,num,tag,text, attributes: {}, children: [] };
				//console.log("123")
				//console.log(text)
				if (VOID_TAGS.includes(text.toLowerCase())) {
                	
					
					cursor.children.push(new_tag);
					non = true;
					parse_attributes(new_tag);
					parse_content(new_tag);
				}
				else
					{
						non = false;
						parse_attributes(new_tag);
						//parse_content(new_tag);
					}
					
					
			})
			// Parse a comment node:
			|| pull(/^<!--((?:[^-]|-(?!->))*)-->/, comment => {
				
			})
			// Parse close tag
			|| pull(/^<[\/]*([a-zA-Z][a-zA-Z0-9\-\:]*)>/, tag => {
				if (cursor.text == tag) {
					
					run = false;
				}

				//console.log("456")
				//console.log(tag)
			})
			// Parse a text node
			|| pull(/^([^<]+)/, text => {
                //console.log(text)
				//console.log("4444444444***")
				var tag="text"
				var id=cursor.text
				var num=cursor.num
				if(non&&!text.includes("\n")&&!text.includes('\t'))
				{
					console.log("**1**"+text)
					cursor.children.push({
						id,num,tag,text
					});
				}
				
			})
			|| pull(/^<([^<]+)/, text => {
				var tag="text"
                var id=cursor.text
				var num=cursor.num
				if(non&&!text.includes("\n")&&!text.includes('\t'))
				{
					console.log("**2**"+text)
					cursor.children.push({
						id,num,tag,text
					});
				}
			})
			|| pull(/^<([<]*)/, text => {
				var tag="text"
                var id=cursor.text
				var num=cursor.num
				if(non&&!text.includes("\n")&&!text.includes('\t'))
				{
					console.log("**3**"+text)
					cursor.children.push({
						id,num,tag,text
					});
				}
			});
			if (!success) {
				
				console.log("Parse error")
				throw new Error("Parse error");
			}
		}
	}
	function parse_attributes(cursor) {
		//console.log("parse_attributes")
		while(pull(/^\s+([a-zA-Z][a-zA-Z0-9\-\_\s]*)=([^>]+)/, (
			name,
			value
		) => {
			//console.log("parse_attributes1")
			//console.log(non)
            if((name.includes("id"||name.includes("class")))&&non)
			{
				
                //console.log(name)
			cursor.attributes[name] = value;}
			//console.log("9999999999")
		})
		|| pull(/^\s+([a-zA-Z][a-zA-Z0-9\-\_\s]*)="([\/^"]*)"/, (
			name,
			value
		) => {
			//console.log("parse_attributes2")
            if((name.includes("id"||name.includes("class")))&&non)
			{
				//console.log("9999999999")
                //console.log(name)
			cursor.attributes[name] = value;}
		})
		|| pull(/^[\s\:]+([a-zA-Z][a-zA-Z0-9\-\_\s]*)="([^"]*)"/, (
			name,
			value
		) => {
			//console.log("parse_attributes3")
            if((name.includes("id"||name.includes("class")))&&non)
			{
				//console.log("9999999999")
                //console.log(name)
			cursor.attributes[name] = value;}
		})) {}
		//console.log("9999999999")
		if (!pull(/^\s*\/*>/)&&!pull(/^[a-zA-Z0-9\-\_\s]+>/)) {
			for(var i=0;i<15;i++)
				console.log(input[i])
			//console.log("Malformed open tag")
			cursor.attributes["123"] = "Malformed open tag";
			throw new Error("Malformed open tag");
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