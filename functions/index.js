const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.database.ref('/course/{courseKey}/joinrequest/{requestKey}').onWrite((event) => {

    const subject = event.data.val();
    const { courseKey, requestKey } = event.params;

    console.log(courseKey + ' ->> ' + requestKey)
    console.log(subject)


    const payload = {
        notification: {
            title: 'New Request',
            body: `From ${subject.author} ,\n "${subject.title}".`,
            icon: 'photoURL',
            sound: 'default',
            clickAction: 'fcm.ACTION.HELLO',

        },
        data: {
            extra: 'extra_data',
        },
    };


    const options = {
        collapseKey: 'demo',
        contentAvailable: true,
        priority: 'high',
        timeToLive: 60 * 60 * 24,
    };

    let topic = `/topics/${courseKey}`;
    console.log(topic)
    console.log(payload)

    return admin.messaging().sendToTopic(topic, payload, options)
        .then((response) => {
            console.log('Successfully sent message:', response);
        });
});