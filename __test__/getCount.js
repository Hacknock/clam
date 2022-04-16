export const getCount = async () => {
  const response = await fetch("https://hogehoge.hogehoge.hogehoge"); // GETする
  const countJson = await response.json(); // Responseのbodyをjsonで得る
  return countJson.count; // 得られたjsonのcountの値を返す
};
