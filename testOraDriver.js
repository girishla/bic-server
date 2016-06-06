// app.js

var path = require('path');
process.env['PATH'] = path.join(__dirname, '../instantclient') + ';' + process.env['PATH'];

var oracledb = require('oracledb');

oracledb.getConnection({
  user: "proteus",
  password: "proteus",
  connectString: "lngoxforad004.legal.regn.net:1521/obidev3"
}, function(err, connection) {
  if (err) {
    console.error(err.message);
    return;
  }
  connection.execute( "SELECT 'PASSED' AS HOORAY FROM DUAL",
    [],
    function(err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      console.log(result.metaData);
      console.log(result.rows);
      doRelease(connection);
    });
});

function doRelease(connection) {
  connection.release(
    function(err) {
      if (err) {console.error(err.message);}
    }
  );
}
