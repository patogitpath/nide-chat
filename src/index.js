import express from "express";
import path from "path";
import morgan from "morgan";
import Customer from "./routes/Customer";
import connect from "./connect";
import upload from "express-fileupload";

const app = express();
connect();


app.set('port', process.env.PORT || '4000');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(morgan('dev'));

app.use(upload());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', Customer);

app.listen(app.get('port'), () => {
    console.log('server start on port ', app.get('port'));
});
