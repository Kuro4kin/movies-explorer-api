const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
// eslint-disable-next-line no-useless-escape
const NAME_EN = /^[\s\w\d\?><;,.()\{\}\[\]\-_\+=!@\#\$%^&\*\|\']*$/;
// eslint-disable-next-line no-useless-escape
const NAME_RU = /^[а-яА-ЯЁё\s\w\d\?><;,.()\{\}\[\]\-_\+=!@\#\$%^&\*\|\']*$/;

module.exports = { URL_REGEX, NAME_EN, NAME_RU };
