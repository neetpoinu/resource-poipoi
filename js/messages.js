import color from './cmd-color.js';

export const OUTPUT_PARTLY_FAILED = files => {
  let message = `${color.white}以下のファイルは対象コミット内に含まれないため、正しく出力されませんでした。
必要であれば手動でどっかから持ってきてね。
`;
  files.forEach(file => { message += `${file}\n`; });
  message += color.reset;
  return message;
};

export const SUCCESS = `${color.green}無事ファイルが出力されました。

${color.yellow}あとは以下の点に注意してね。
${color.white}objects, labels等のメタデータは色んな情報を含んでいるのでリリースしたくない情報は自分でメタデータファイルとpackage.xmlから消してね

${color.cyan}
                         糸冬

                      制作・著作
                      ─────
                        ⓃⒽⓀ

${color.reset}`;

export const EXCEPTION = exception => `${color.yellow}なんかエラった。\n${color.red}${exception}${color.reset}`;
