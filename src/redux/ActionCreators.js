import * as ActionType from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionType.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmes = new Error(error.message);
            throw errmes;
        })
        .then(response => response.json())
        .then(response => dispatch(addComment(response)))
        .catch(error => { console.log('post comments', error.message);
                        alert('Your comment could not be posted\nError: ' + error.message); });
};

export const addFeedback = (feedback) => ({
    type: ActionType.ADD_FEEDBACK,
    payload: feedback
});

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {

    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    };

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmes = new Error(error.message);
        throw errmes;
    })
    .then(response => response.json())
    .then(response => alert('Thank you for your feedback!\n' + JSON.stringify(response)))
    .catch(error => { console.log('post feedback', error.message);
                    alert('Your feedback could not be posted\nError: ' + error.message); });
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmes = new Error(error.message);
            throw errmes;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
};

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmes = new Error(error.message);
            throw errmes;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmes = new Error(error.message);
            throw errmes;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
};

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(leaders => dispatch(addLeaders(leaders)))
        .catch(error => dispatch(leadersFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionType.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionType.DISHES_FAILED,
    payload: errMess
});

export const addDishes = (dishes) => ({
    type: ActionType.ADD_DISHES,
    payload: dishes
});

export const addComments = (comments) => ({
    type: ActionType.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errMess) => ({
    type: ActionType.COMMENTS_FAILED,
    payload: errMess
});

export const promosLoading = () => ({
    type: ActionType.PROMOS_LOADING
});

export const addPromos = (promos) => ({
    type: ActionType.ADD_PROMOS,
    payload: promos
});

export const promosFailed = (errMess) => ({
    type: ActionType.PROMOS_FAILED,
    payload: errMess
});

export const leadersLoading = () => ({
    type: ActionType.LEADERS_LOADING
});

export const addLeaders = (leaders) => ({
    type: ActionType.ADD_LEADERS,
    payload: leaders
});

export const leadersFailed = (errMess) => ({
    type: ActionType.LEADERS_FAILED,
    payload: errMess
});