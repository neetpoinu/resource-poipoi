import color from './cmd-color.mjs';

const START = `${color.white}処理開始...${color.reset}`;

const SUCCESS = `${color.green}outputフォルダに無事ファイルが出力されました。

${color.yellow}あとは以下の点に注意してね。
${color.white}1. xxx-meta.xmlが変更ファイル一覧に含まれていない場合もリリースには必要なので、ない場合は自分でコピーしてね
2. objectのメタデータは色んな情報を含んでいるのでリリースにしたくない情報は自分で.objectとpackage.xmlを編集して消してね

                     ${color.cyan}- 完 -${color.reset}
`;

const EXCEPTION = exception => `${color.yellow}なんかエラった。\n${color.red}${exception}${color.reset}`;

export default {
  START,
  SUCCESS,
  EXCEPTION
}
