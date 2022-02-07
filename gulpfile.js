
const fs = require('fs');
const { src, dest, task } = require('gulp');

const hashstream = require('inline-csp-hash');

function hash() {

  const scriptHashes = [];

  return src('_site/**/*.html')
    .pipe(hashstream({
      what: 'script',
      replace_cb: (s, hashes) => { scriptHashes.push(...hashes); return s; },
    }))
    .on('finish', () => {
      const hashes = new Set(scriptHashes);
      fs.writeFileSync(__dirname + '/_site/script-hashes.txt',
        [...hashes].join('\n'),
      );
    })
    ;
};

exports.hash = hash;
