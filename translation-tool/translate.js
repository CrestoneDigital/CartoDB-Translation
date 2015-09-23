// commander  get --apiKey to be used
var program = require('commander');
var async = require('async');
var _ = require('underscore');
var fs = require('fs'),
	path = require("path"),
  util = require("util");
var apiKey;
program
	.option('-a --api <n>', 'Default: ')
	.parse(process.argv);
apiKey = (program.api) ? program.api : '';
console.log(apiKey);
// if(apiKey == '') {
	// console.log("A valid apikey must be given");
	// process.exit(0);
// }

var googleTranslate = require('google-translate')(apiKey);


var languages = [
   {
    "language": "af",
    "name": "Afrikaans"
   },
   {
    "language": "sq",
    "name": "Albanian"
   },
   {
    "language": "ar",
    "name": "Arabic"
   },
   {
    "language": "hy",
    "name": "Armenian"
   },
   {
    "language": "az",
    "name": "Azerbaijani"
   },
   {
    "language": "eu",
    "name": "Basque"
   },
   {
    "language": "be",
    "name": "Belarusian"
   },
   {
    "language": "bn",
    "name": "Bengali"
   },
   {
    "language": "bs",
    "name": "Bosnian"
   },
   {
    "language": "bg",
    "name": "Bulgarian"
   },
   {
    "language": "ca",
    "name": "Catalan"
   },
   {
    "language": "ceb",
    "name": "Cebuano"
   },
   {
    "language": "ny",
    "name": "Chichewa"
   },
   {
    "language": "zh",
    "name": "Chinese (Simplified)"
   },
   {
    "language": "zh-TW",
    "name": "Chinese (Traditional)"
   },
   {
    "language": "hr",
    "name": "Croatian"
   },
   {
    "language": "cs",
    "name": "Czech"
   },
   {
    "language": "da",
    "name": "Danish"
   },
   {
    "language": "nl",
    "name": "Dutch"
   },
   {
    "language": "en",
    "name": "English"
   },
   {
    "language": "eo",
    "name": "Esperanto"
   },
   {
    "language": "et",
    "name": "Estonian"
   },
   {
    "language": "tl",
    "name": "Filipino"
   },
   {
    "language": "fi",
    "name": "Finnish"
   },
   {
    "language": "fr",
    "name": "French"
   },
   {
    "language": "gl",
    "name": "Galician"
   },
   {
    "language": "ka",
    "name": "Georgian"
   },
   {
    "language": "de",
    "name": "German"
   },
   {
    "language": "el",
    "name": "Greek"
   },
   {
    "language": "gu",
    "name": "Gujarati"
   },
   {
    "language": "ht",
    "name": "Haitian Creole"
   },
   {
    "language": "ha",
    "name": "Hausa"
   },
   {
    "language": "iw",
    "name": "Hebrew"
   },
   {
    "language": "hi",
    "name": "Hindi"
   },
   {
    "language": "hmn",
    "name": "Hmong"
   },
   {
    "language": "hu",
    "name": "Hungarian"
   },
   {
    "language": "is",
    "name": "Icelandic"
   },
   {
    "language": "ig",
    "name": "Igbo"
   },
   {
    "language": "id",
    "name": "Indonesian"
   },
   {
    "language": "ga",
    "name": "Irish"
   },
   {
    "language": "it",
    "name": "Italian"
   },
   {
    "language": "ja",
    "name": "Japanese"
   },
   {
    "language": "jw",
    "name": "Javanese"
   },
   {
    "language": "kn",
    "name": "Kannada"
   },
   {
    "language": "kk",
    "name": "Kazakh"
   },
   {
    "language": "km",
    "name": "Khmer"
   },
   {
    "language": "ko",
    "name": "Korean"
   },
   {
    "language": "lo",
    "name": "Lao"
   },
   {
    "language": "la",
    "name": "Latin"
   },
   {
    "language": "lv",
    "name": "Latvian"
   },
   {
    "language": "lt",
    "name": "Lithuanian"
   },
   {
    "language": "mk",
    "name": "Macedonian"
   },
   {
    "language": "mg",
    "name": "Malagasy"
   },
   {
    "language": "ms",
    "name": "Malay"
   },
   {
    "language": "ml",
    "name": "Malayalam"
   },
   {
    "language": "mt",
    "name": "Maltese"
   },
   {
    "language": "mi",
    "name": "Maori"
   },
   {
    "language": "mr",
    "name": "Marathi"
   },
   {
    "language": "mn",
    "name": "Mongolian"
   },
   {
    "language": "my",
    "name": "Myanmar (Burmese)"
   },
   {
    "language": "ne",
    "name": "Nepali"
   },
   {
    "language": "no",
    "name": "Norwegian"
   },
   {
    "language": "fa",
    "name": "Persian"
   },
   {
    "language": "pl",
    "name": "Polish"
   },
   {
    "language": "pt",
    "name": "Portuguese"
   },
   {
    "language": "pa",
    "name": "Punjabi"
   },
   {
    "language": "ro",
    "name": "Romanian"
   },
   {
    "language": "ru",
    "name": "Russian"
   },
   {
    "language": "sr",
    "name": "Serbian"
   },
   {
    "language": "st",
    "name": "Sesotho"
   },
   {
    "language": "si",
    "name": "Sinhala"
   },
   {
    "language": "sk",
    "name": "Slovak"
   },
   {
    "language": "sl",
    "name": "Slovenian"
   },
   {
    "language": "so",
    "name": "Somali"
   },
   {
    "language": "es",
    "name": "Spanish"
   },
   {
    "language": "su",
    "name": "Sundanese"
   },
   {
    "language": "sw",
    "name": "Swahili"
   },
   {
    "language": "sv",
    "name": "Swedish"
   },
   {
    "language": "tg",
    "name": "Tajik"
   },
   {
    "language": "ta",
    "name": "Tamil"
   },
   {
    "language": "te",
    "name": "Telugu"
   },
   {
    "language": "th",
    "name": "Thai"
   },
   {
    "language": "tr",
    "name": "Turkish"
   },
   {
    "language": "uk",
    "name": "Ukrainian"
   },
   {
    "language": "ur",
    "name": "Urdu"
   },
   {
    "language": "uz",
    "name": "Uzbek"
   },
   {
    "language": "vi",
    "name": "Vietnamese"
   },
   {
    "language": "cy",
    "name": "Welsh"
   },
   {
    "language": "yi",
    "name": "Yiddish"
   },
   {
    "language": "yo",
    "name": "Yoruba"
   },
   {
    "language": "zu",
    "name": "Zulu"
   }
  ];

var fnAr = [], data = {};
var masterData = JSON.parse(fs.readFileSync(path.resolve(path.join('../languages','master.js')),'utf8').replace('var cdb_lang_file = ', ''));

// Create missing files

_.each(languages, function(lng){
	var filename = lng.language + '.i18n.js';
	var lnprefix = lng.language;
			console.log(filename);
	fnAr.push(function(cb) {
			console.log(filename, ' -- ');
		fs.access(path.resolve(path.join('../languages',filename)), function (err) {
			if(err) {
				fs.createReadStream(path.resolve(path.join('../languages/old','jp.i18n.js'))).pipe(fs.createWriteStream(path.resolve(path.join('../languages',filename))));
			}
			cb();
		});		
	});
});
async.parallel(fnAr,function(err, results) {
	console.log("In function");
	// call fn to translate and add data to files.
	processData();
});


function processData() {
	var fns = [];
	if(masterData) {
		_.each(masterData, function(value, key) {
			fns.push(function(cb) {
				if(value === false) {
					// need to be translated
					translateUpdateProcess(key, function(status) {
						cb();
					});
				}
			});
		});
		async.series(fns,function(err, results) {
			console.log("process completed");
		});
		
	}

}

// translates the key for different languages, updates the corresponding files too.
function translateUpdateProcess(key, callback) {
	var fns = [];
	_.each(languages, function(lng){
		fns.push(function(cb){
			googleTranslate.translate(key, 'en', lng.language, function (err, translation) {
					// console.log(translation.translatedText);
				var dt = fs.readFileSync(path.resolve(path.join('../languages',lng.language + '.i18n.js')),'utf8');
				dtReplace = dt.substring(dt.indexOf('//start') + '//start'.length, dt.indexOf('//end'));
				var dtObj = JSON.parse(dtReplace.trim());
				dtObj[key] = translation.translatedText;
				dt = dt.replace(dtReplace,JSON.stringify(dtObj));
				fs.writeFile(path.resolve(path.join('../languages',lng.language + '.i18n.js')), dt, 'utf8', function(err){
					cb();
				});
			});					
		});
	});
	async.series(fns,function(err, results) {
		callback(true);
	});
}


/*	
	
	
	//console.log(languages[i].language);
	googleTranslate.translate('Adding new column', 'en', languages[i].language, function (err, translation) {
		console.log(translation.translatedText);
		fs.writeFileSync('../languages/old/'+languages[i].language+'.i18n.js', fs.readFileSync('../languages/master.js'));
		var content;
        console.log(content);
        fs.readFile(path.join(__dirname,"../languages/old/",languages[i].language+'.i18n.js'), 'utf8',function (err,data) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            content = util.format(data); 
			
var temp = new Array();
// this will return an array with strings "1", "2", etc. 
content = content.replace(/(\r\n|\n|\r)/gm,"");
content = content.replace("\": false,","");
content = content.replace("\',","");
content = content.replace("',","");
temp = content.split("\": false");


            console.log(temp);
        });
	});
}
*/