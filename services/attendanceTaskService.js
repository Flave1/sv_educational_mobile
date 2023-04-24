const synchronizeAttendance = async () => {
    // do stuff
    console.log('here is background app running');
    setInterval(() => {
        console.log('here is background app keep running');
    }, 2000)
};

module.exports = {
    synchronizeAttendance
}

// module.exports = async () => {
//     console.log('Headless task running');

//     // register the same task again after 30 minutes
//     setTimeout(module.exports, 10000);
// };