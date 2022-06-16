export const getImgHelpers = (img: string, parsed: boolean): string => {
  if(!img) return "";

  let link: string;

  if(parsed) {
    const parseImg = img.split(/\d+w,/);
    link = parseImg[parseImg.length - 1];
  } else {
    link = process.env.REACT_APP_SERVER_URL + "/posts/" + img;
  }

  return link
}