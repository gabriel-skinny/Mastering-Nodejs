const exec = require("child_process").exec;

exec(`file --brief --mime teste.json`, (err, mime) => {
    if (err) throw new Error(err);

    const extension = mime.split("/")[1].split(";")[0]

    if (extension != "png") {
        console.log("não é png, é ", extension)
    }else {
        console.log(mime);
    }
})