// const date = new Date();

// const getDay = (date.getDate() > 9 ? '' : '0')
// const getMonth = ((date.getMonth() + 1) > 9 ? '' : '0')
// const getYear = date.getFullYear()
// const getHour = date.getHours()
// const getMinute = date.getMinutes()
// const getSecond = date.getSeconds()

// var formattedDate  = getDay +"-"+ getMonth +"-"+ getYear +"-"+ getHour +":"+ getMinute +":"+ getSecond

// const myPlugin = {
//     install(app) {
//         app.config.globalProperties.$formattedDate = () => {
//             return Hello;
//         }
//     }
// }

// export default myPlugin;

const myPlugin = {
    install(app) {
        app.config.globalProperties.$numFormat = () => {
            return "hello"
        }
    }
}

export default myPlugin;