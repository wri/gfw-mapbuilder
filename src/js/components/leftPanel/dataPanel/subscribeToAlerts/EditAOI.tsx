//const userToken = localStorage.getItem('userToken');
////This gets all the subscriptions> but should be in useEffect
//fetch(subscriptionURL, {
//  method: 'GET',
//  headers: {
//    'Content-Type': 'application/json',
//    Authorization: `Bearer ${userToken}`
//  }
//})
//  .then(response => {
//    if (response.status === 200) {
//      return response.json();
//    }
//  })
//  .then(results => {
//    dispatch(setUserSubscriptions(results.data));
//  })
//  .catch(e =>
//    console.error('error GETTING subscriptions in updateSubscriptions()', e)
//  );
