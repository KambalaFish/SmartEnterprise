// const nameRegEx = /^(?:[aA-zZ]+\s?[aA-zZ]*)*$/g;
export const nameRegEx = /^[a-zA-Z]+(?:(?:,\s|\s-\s|[-\s'])?[a-zA-Z]+)*\.{0,3}$/g;

// const phoneRegEx = /^\+?(?:\s?\d)*$/g;
// export const phoneRegEx = /^\+?\s?\d+(\.|\s|-)?(\1?\d)*$/g;
export const phoneRegEx = /^\+?\d*\s?(?:\(\d+\)\s?\d+([-\s.]?)(?:\1?\d)*|([.\s-]?)(\2?\d)*)$/g;

export const passwordRegEx = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/g;
//https://regex101.com/
