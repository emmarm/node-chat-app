const deparam = (uri) => {
  const query = uri;
  const queryString = {};
  query.replace(
    new RegExp('([^?=&]+)(=([^&#]*))?', 'g'),
    ($0, $1, $2, $3) => {
      queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
    }
  );
  return queryString;
};
