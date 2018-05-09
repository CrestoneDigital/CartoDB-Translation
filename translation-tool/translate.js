// commander  get --apiKey to be used
const program = require('commander');
const async = require('async');
const _ = require('underscore');
const fs = require('fs'),
  path = require("path"),
  util = require("util");
var apiKey;
program
  .option('-a --api <n>', 'Default: ')
  .parse(process.argv);
apiKey = (program.api) ? program.api : '';
if (apiKey == '') {
  console.log("A valid apikey must be given");
  process.exit(0);
}

var googleTranslate = require('google-translate')(apiKey);

var languages = [{
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
]
var fnAr = [],
  data = {},
  ws = null,
  masterData, dtReplace, dtObj, fns = [];
var masterData = JSON.parse(fs.readFileSync(path.resolve(path.join('../languages/', 'master.js')), 'utf8').replace('var cdb_lang_file = ', ''));
fs.readFile(path.resolve(path.join('../languages/', 'master.js')), 'utf8', (err, data) => {
  if (err) {
    console.log('Error reading master file!');
  } else {
    masterData = JSON.parse(data.replace('var cdb_lang_file = ', ''));

    _.each(languages, function (lng) {
      var filename = lng.language + '.i18n.js';
      var lnprefix = lng.language;
      fnAr.push(function (cb) {
        fs.access(path.resolve(path.join('../languages/anothertest', filename)), function (err) {
          if (err) {
            ws = fs.createWriteStream(path.resolve(path.join('../languages/anothertest', filename)));
            fs.createReadStream(path.resolve(path.join('../languages/old', 'tpl.i18n.js'))).pipe(ws);
            ws.on('finish', function () {
              cb();
            });
          } else {
            cb();
          }
        });
      });
    });

    // Create missing files
    async.parallel(fnAr, function (err, results) {
      // call fn to translate and add data to files.
      processData();
    });
  }
});

function processData() {
  var fns = [];
  if (masterData) {
    _.each(masterData, function (value, key) {
      fns.push(function (cb) {
        if (value === false) {
          // need to be translated
          translateUpdateProcess(key, function (status) {
            cb();
          });
        }
      });
    });
    async.series(fns, function (err, results) {
      console.log("process completed");
    });

  }

}

// translates the key for different languages, updates the corresponding files too.
function translateUpdateProcess(key, callback) {
  fns = [];
  _.each(languages, function (lng) {
    fns.push(function (cb) {

      fs.readFile(path.resolve(path.join('../languages/anothertest', lng.language + '.i18n.js')), 'utf8', (err, dt) => {
        if (err) {
          console.log('Error reading master file!');
        } else {
          dtReplace = dt.substring(dt.indexOf('//start') + '//start'.length, dt.indexOf('//end'));
          dtObj = JSON.parse(dtReplace.trim());
          if (!dtObj[key]) {
            googleTranslate.translate(key, 'en', lng.language, function (err, translation) {
              if (err) {
                cb();
              } else if (typeof translation == 'undefined') {
                cb();
              } else {
                dtObj[key] = translation.translatedText;
                dt = dt.replace(dtReplace, "\r\n" + JSON.stringify(dtObj, null, 4) + "\r\n");
                fs.writeFile(path.resolve(path.join('../languages/anothertest', lng.language + '.i18n.js')), dt, 'utf8', function (err) {
                  cb();
                });
              }
            })
          } else {
            cb();
          }

        }
      })
    });
  });
  async.series(fns, function (err, results) {
    callback(true);
  });
}