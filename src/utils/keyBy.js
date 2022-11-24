export const keyBy = (collection, grouper) => {
  const result = {}; // создаем пустой объект
  const getKey = (elem) =>
    typeof grouper === "function" ? grouper(elem) : elem[grouper]; // создаем функцию которая будет получать ключ, если передали колбек то ключем будет результат колбека на каждом элементе
  const itarateCollaction = Array.isArray(collection)
    ? collection
    : Object.values(collection); // проверяем что нам передали, если объект то нужно взять все его значения (так работает оригинал в lodash)

  itarateCollaction.forEach((value) => {
    // итерируемся по переданной коллекции
    const key = getKey(value); // получаем ключ
    result[key] = value; // тупо перезаписываем старое значение если оно было, если нет пишем новое
  });

  return result;
};
