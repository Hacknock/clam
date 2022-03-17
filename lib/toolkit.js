class ToolKit {
  detectURL(url) {
    const pattern = /^https?:\/\/localhost:[0-9]*/;
    const pattern2 = /^https:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+\.[a-z]+/;
    const pattern3 = /^https?:\/\/localhost$/;
    const pattern4 = /^https?:\/\/localhost\/[a-zA-Z/:%#\$&\?\(\)~\.=\+\-]*/;
    return !(
      !pattern.exec(url) &&
      !pattern2.exec(url) &&
      !pattern3.exec(url) &&
      !pattern4.exec(url)
    );
  }
}
export default ToolKit;
