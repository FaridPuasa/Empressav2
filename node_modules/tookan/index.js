const axios = require("axios");

/** main configration for this lib
 *
 * 
 */
const tookan_key = process.env.tookan_key; //tookan API key from the tookan setting panel
const userid = process.env.tookan_userid;//tookan API key from the tookan user id you can get it from your profile
const delimiter = '/'; //given to server as a user agent
const main_domain = 'https://api.tookanapp.com';
const version_of_api = 'v2'; // version of API thing before changing this
const api_agent = 'Tooken-node-server'; //given to server as a user agent

/** Error Declaration
 *
 * 
 */
let err = new Error();
err.name = 'Tookan Error';

/**Get Agents
 *
 * No input required by colling this Function will give you the object of Agents from tooken with there status
 */
let get_agents = async () => {
    let let_url = main_domain + delimiter + version_of_api + delimiter + 'get_available_agents';
    try {
        let options = {
            method: 'post',
            url: let_url,
            data: {
                'api_key': tookan_key
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await axios(options);
        if (res.status == 200) {
            return res.data;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

/* is a function to check the object
 */
isObject = function(a) {
    return (!!a) && (a.constructor === Object);
};

/** Create Pickup Task
 *
 * This is to create a Pickup Task with tooken
 * payload.order_id* - Unique Id of the task
 * payload.job_description* - Task description like simple nots
 * payload.job_pickup_phone* - Pickup phone number 
 * payload.job_pickup_datetime* - date time to be pickup
 * payload.job_pickup_address* - pickup address
 * payload.job_pickup_name - name of the person to pickup
 * payload.job_pickup_email - email of the person to be pickup
 * payload.job_pickup_latitude - lattitude of the location to be pickedup
 * payload.job_pickup_longitude - longitude of the location to be pickedup
 * payload.auto_assignment - (boolen) set this param true to allowcate the deliver man
 * payload.notify - (boolen) set this param true to notify
 * @param {object} payload 
 */
let create_pickup = async (payload) => {
    if (isObject(payload) && payload.hasOwnProperty('order_id') && payload.hasOwnProperty('job_description') && payload.hasOwnProperty('job_pickup_phone') && payload.hasOwnProperty('job_pickup_datetime') && payload.hasOwnProperty('job_pickup_address') ) {
        let let_url = main_domain + delimiter + version_of_api + delimiter + 'create_task';
        try {
            let options = {
                method: 'post',
                url: let_url,
                data: {
                    'api_key': tookan_key,
                    'order_id':payload.order_id,
                    'job_description':payload.job_description,
                    'job_pickup_phone':payload.job_pickup_phone,
                    'job_pickup_datetime':payload.job_pickup_datetime,
                    'has_pickup':1,
                    'has_delivery':0,
                    'layout_type':0,
                    'tracking_link':1,
                    'timezone':'EST+0400',
                    'auto_assignment':0,
                    'notify':0,
                    'tags':'Pickup, Order#'+payload.order_id,
                    'job_pickup_address':payload.job_pickup_address
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if(payload.hasOwnProperty('job_pickup_name')){
                options.data.job_pickup_name = payload.job_pickup_name;
            }if(payload.hasOwnProperty('job_pickup_email')){
                options.data.job_pickup_email = payload.job_pickup_email;
            }if(payload.hasOwnProperty('job_pickup_latitude')){
                options.data.job_pickup_latitude = payload.job_pickup_latitude;
            }if(payload.hasOwnProperty('job_pickup_longitude')){
                options.data.job_pickup_longitude = payload.job_pickup_longitude;
            }if(payload.hasOwnProperty('auto_assignment') && payload.auto_assignment == true ){
                options.data.auto_assignment = 1;
            }if(payload.hasOwnProperty('notify') && payload.notify == true ){
                options.data.notify = 1;
            }

            let res = await axios(options);
            if (res.status == 200) {
                return res.data;
            } else {
                err.code = 5007
                err.message = 'Response from Tooken is not succeess plz check the credentials)';
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }else{
        err.code = 5008
        err.message = 'Input should be object and required parameters are order_id, job_description, job_pickup_phone, job_pickup_datetime, job_pickup_address';
        throw err;
    }
};


/** Create Delivery Task
 *
 * This is to create a Pickup Task with tooken
 * payload.order_id* - Unique Id of the task
 * payload.job_description* - Task description like simple nots
 * payload.job_delivery_phone* - customer phone number 
 * payload.job_delivery_datetime* - date time to be delivered
 * payload.job_delivery_address* - delivery address
 * payload.customer_username - name of the person to deliver
 * payload.customer_email - email of the person to be deliver
 * payload.latitude - lattitude of the location to be deliver
 * payload.longitude - longitude of the location to be deliver
 * payload.auto_assignment - (boolen) set this param true to allowcate the deliver man
 * payload.notify - (boolen) set this param true to notify
 * 
 * @param {object} payload 
 */
let create_delivery = async (payload) => {
    if (isObject(payload) && payload.hasOwnProperty('order_id') && payload.hasOwnProperty('job_description') && payload.hasOwnProperty('job_delivery_phone') && payload.hasOwnProperty('job_delivery_datetime') && payload.hasOwnProperty('job_delivery_address') ) {
        let let_url = main_domain + delimiter + version_of_api + delimiter + 'create_task';
        try {
            let options = {
                method: 'post',
                url: let_url,
                data: {
                    'api_key': tookan_key,
                    'order_id':payload.order_id,
                    'job_description':payload.job_description,
                    'customer_phone':payload.job_delivery_phone,
                    'job_delivery_datetime':payload.job_delivery_datetime,
                    'has_pickup':0,
                    'has_delivery':1,
                    'layout_type':0,
                    'tracking_link':1,
                    'timezone':'EST+0400',
                    'auto_assignment':0,
                    'notify':0,
                    'tags':'Pickup, Order#'+payload.order_id,
                    'customer_address':payload.job_delivery_address,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if(payload.hasOwnProperty('customer_username')){
                options.data.customer_username = payload.customer_username;
            }if(payload.hasOwnProperty('customer_email')){
                options.data.customer_email = payload.customer_email;
            }if(payload.hasOwnProperty('latitude')){
                options.data.latitude = payload.latitude;
            }if(payload.hasOwnProperty('longitude')){
                options.data.longitude = payload.longitude;
            }if(payload.hasOwnProperty('auto_assignment') && payload.auto_assignment == true ){
                options.data.auto_assignment = 1;
            }if(payload.hasOwnProperty('notify') && payload.notify == true ){
                options.data.notify = 1;
            }
                        
            let res = await axios(options);
            if (res.status == 200) {
                return res.data;
            } else {
                err.code = 5007
                err.message = 'Response from Tooken is not succeess plz check the credentials)';
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }else{
        err.code = 5008
        err.message = 'Input should be object and required parameters are order_id, job_description, job_delivery_phone, job_delivery_datetime, job_delivery_address';
        throw err;
    }
};

/** Check Task
 *
 * This is to get the job details from tooken
 * payload.job_id* - Unique Id of the Job
 * 
 * response is a object that will contan all the job related items
 * @param {object} payload 
 */
let check_task = async (payload) => {
    if (isObject(payload) && payload.hasOwnProperty('job_id')) {
        let let_url = main_domain + delimiter + version_of_api + delimiter + 'get_task_details';
        try {
            let options = {
                method: 'post',
                url: let_url,
                data: {
                    'api_key': tookan_key,
                    'job_id':payload.job_id,
                    'user_id':userid,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = await axios(options);
            if (res.status == 200) {
                return res.data;
            } else {
                err.code = 5007
                err.message = 'Response from Tooken is not succeess plz check the credentials)';
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }else{
        err.code = 5008
        err.message = 'Input should be object and required parameters Job_id';
        throw err;
    }
};

/** Check Task By Order Id
 *
 * This is to get the job details from tooken
 * payload.order_id* - Unique Order Id of the Job
 * 
 * response is a object that will contan all the job related items
 * @param {object} payload 
 */

let check_task_by_orderid = async (payload) => {
    if (isObject(payload) && payload.hasOwnProperty('order_id')) {
        let let_url = main_domain + delimiter + version_of_api + delimiter + 'get_task_details_by_order_id';
        try {
            let options = {
                method: 'post',
                url: let_url,
                data: {
                    'api_key': tookan_key,
                    'order_id':payload.order_id,
                    'user_id':userid,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = await axios(options);
            if (res.status == 200) {
                return res.data;
            } else {
                err.code = 5007
                err.message = 'Response from Tooken is not succeess plz check the credentials)';
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }else{
        err.code = 5008
        err.message = 'Input should be object and required parameters order_id';
        throw err;
    }
};


/** rm Task
 *
 * This is to remove the task from tooken
 * payload.job_id* - Unique Id of the Job
 * 
 * response is a object will contain the success or error message with status code
 * @param {object} payload 
 */
let rm_task = async (payload) => {
    if (isObject(payload) && payload.hasOwnProperty('job_id')) {
        let let_url = main_domain + delimiter + version_of_api + delimiter + 'delete_task';
        try {
            let options = {
                method: 'post',
                url: let_url,
                data: {
                    'api_key': tookan_key,
                    'job_id':payload.job_id,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = await axios(options);
            if (res.status == 200) {
                return res.data;
            } else {
                err.code = 5007
                err.message = 'Response from Tooken is not succeess plz check the credentials)';
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }else{
        err.code = 5008
        err.message = 'Input should be object and required parameters job_id';
        throw err;
    }
};

/** Edit Delivery Task Task
 * 
 * This api used to edit a task that has already been added.
 * Request Body Parameters : Every parameter is same as while creating a task 
 * parameter that should added while editing a task is shown below.
 * 
 * payload.job_id - Unique job_id of the task
 * payload.job_description - Task description like simple nots
 * payload.job_delivery_phone - customer phone number 
 * payload.job_delivery_datetime - date time to be delivered
 * payload.job_delivery_address - delivery address
 * payload.customer_username - name of the person to deliver
 * payload.customer_email - email of the person to be deliver
 * payload.latitude - lattitude of the location to be deliver
 * payload.longitude - longitude of the location to be deliver
 * payload.auto_assignment - (boolen) set this param true to allowcate the deliver man
 * payload.notify - (boolen) set this param true to notify
 * 
 * @param {object} payload
 */
let edit_delivery_task = async (payload) => {
    if (isObject(payload) && payload.hasOwnProperty('job_id')) {
        let let_url = main_domain + delimiter + version_of_api + delimiter + 'edit_task';
        try {
            let options = {
                method: 'post',
                url: let_url,
                data: {
                    'api_key': tookan_key,
                    'job_id':payload.job_id,
                    'has_pickup':0,
                    'has_delivery':1,
                    'layout_type':0,
                    'tracking_link':1,
                    'timezone':'EST+0400',
                    'auto_assignment':0,
                    'notify':0,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if(payload.hasOwnProperty('job_description')){
                options.data.job_description = payload.job_description;
            } if(payload.hasOwnProperty('job_delivery_phone')){
                options.data.customer_phone = payload.job_delivery_phone;
            } if(payload.hasOwnProperty('job_delivery_datetime')){
                options.data.job_delivery_datetime = payload.job_delivery_datetime;
            } if(payload.hasOwnProperty('job_delivery_address')){
                options.data.customer_address = payload.job_delivery_address;
            } if(payload.hasOwnProperty('customer_username')){
                options.data.customer_username = payload.customer_username;
            } if(payload.hasOwnProperty('customer_email')){
                options.data.customer_email = payload.customer_email;
            } if(payload.hasOwnProperty('latitude')){
                options.data.latitude = payload.latitude;
            } if(payload.hasOwnProperty('longitude')){
                options.data.longitude = payload.longitude;
            } if(payload.hasOwnProperty('auto_assignment') && payload.auto_assignment == true ){
                options.data.auto_assignment = 1;
            } if(payload.hasOwnProperty('notify') && payload.notify == true ){
                options.data.notify = 1;
            }
                        
            let res = await axios(options);
            if (res.status == 200) {
                return res.data;
            } else {
                err.code = 5007
                err.message = 'Response from Tooken is not succeess plz check the credentials)';
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }else{
        err.code = 5008
        err.message = 'Input should be object and required parameters is job_id';
        throw err;
    }
}

/** Edit Pickup task
 * 
 * This api used to edit a task that has already been added.
 * Request Body Parameters : Every parameter is same as while creating a task 
 * parameter that should added while editing a task is shown below.
 * 
 * payload.job_id - Unique job_id of the task
 * payload.job_description* - Task description like simple nots
 * payload.job_pickup_phone* - Pickup phone number 
 * payload.job_pickup_datetime* - date time to be pickup
 * payload.job_pickup_address* - pickup address
 * payload.job_pickup_name - name of the person to pickup
 * payload.job_pickup_email - email of the person to be pickup
 * payload.job_pickup_latitude - lattitude of the location to be pickedup
 * payload.job_pickup_longitude - longitude of the location to be pickedup
 * payload.auto_assignment - (boolen) set this param true to allowcate the deliver man
 * payload.notify - (boolen) set this param true to notify
 * 
 * @param {object} payload 
 */
let edit_pickup_task = async (payload) => {
    if (isObject(payload) && payload.hasOwnProperty('job_id')) {
        let let_url = main_domain + delimiter + version_of_api + delimiter + 'edit_task';
        try {
            let options = {
                method: 'post',
                url: let_url,
                data: {
                    'api_key': tookan_key,
                    'job_id':payload.job_id,
                    'has_pickup':1,
                    'has_delivery':0,
                    'layout_type':0,
                    'tracking_link':1,
                    'timezone':'EST+0400',
                    'auto_assignment':0,
                    'notify':0,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            if(payload.hasOwnProperty('job_description')){
                options.data.job_description = payload.job_description;
            }if(payload.hasOwnProperty('job_pickup_phone')){
                options.data.job_pickup_phone = payload.job_pickup_phone;
            }if(payload.hasOwnProperty('job_pickup_datetime')){
                options.data.job_pickup_datetime = payload.job_pickup_datetime;
            }if(payload.hasOwnProperty('job_pickup_address')){
                options.data.job_pickup_address = payload.job_pickup_address;
            }if(payload.hasOwnProperty('job_pickup_name')){
                options.data.job_pickup_name = payload.job_pickup_name;
            }if(payload.hasOwnProperty('job_pickup_email')){
                options.data.job_pickup_email = payload.job_pickup_email;
            }if(payload.hasOwnProperty('job_pickup_latitude')){
                options.data.job_pickup_latitude = payload.job_pickup_latitude;
            }if(payload.hasOwnProperty('job_pickup_longitude')){
                options.data.job_pickup_longitude = payload.job_pickup_longitude;
            }if(payload.hasOwnProperty('auto_assignment') && payload.auto_assignment == true ){
                options.data.auto_assignment = 1;
            }if(payload.hasOwnProperty('notify') && payload.notify == true ){
                options.data.notify = 1;
            }

            let res = await axios(options);
            if (res.status == 200) {
                return res.data;
            } else {
                err.code = 5007
                err.message = 'Response from Tooken is not succeess plz check the credentials)';
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }else{
        err.code = 5008
        err.message = 'Input should be object and required parameters is job_id';
        throw err;
    }
}

module.exports = {
    get_agents,
    create_pickup,
    create_delivery,
    check_task,
    check_task_by_orderid,
    rm_task,
    edit_delivery_task,
    edit_pickup_task,
}