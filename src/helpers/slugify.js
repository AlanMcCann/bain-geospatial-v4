export const slugify = (string) => {
    string = string.toLowerCase();
    string = string.replace(/[á|ã|â|à]/gi, "a");
    string = string.replace(/[é|ê|è]/gi, "e");
    string = string.replace(/[í|ì|î]/gi, "i");
    string = string.replace(/[õ|ò|ó|ô]/gi, "o");
    string = string.replace(/[ú|ù|û]/gi, "u");
    string = string.replace(/[ç]/gi, "c");
    string = string.replace(/[ñ]/gi, "n");
    string = string.replace(/[á|ã|â]/gi, "a");
    string = string.replace(/\W/gi, "-");
    string = string.replace(/(-)\1+/gi, "-");
    string = string.replace(/(_)\1+/gi, "-");
    return string;
}