export function generateGUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


export function dateNow() {
  const date = new Date();
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}


export const Search = ({ arrayofObjects, searchQuery, columns }: any): Promise<any[]> => {
  return arrayofObjects && arrayofObjects?.filter((item: any) => {
    if (searchQuery === "") {
      console.log('arrayofObjects', arrayofObjects);
      
      return item;
    }
    for (let i = 0; i < columns.length; i++) {
      if (item[columns[i]]?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
        return item;
    }
  });


}
