import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function LoginOrSignup() {
    return <div>
        <Link to="/login">Login</Link>
        <div> or </div><Link to="/signup">Sign Up</Link>
        </div>;
}

function AccountInfo({ user }) {
    const [displayReviews, setDisplayReviews] = useState(false);
    const [displayRatings, setDisplayRatings] = useState(false);

    return <div>
            <h1>{user.username}</h1>
            <div>{user.email}</div>
            <br></br>
            <h2 onClick={() => setDisplayReviews(!displayReviews)}>Reviews</h2>
            <div>
                { displayReviews && user.reviews.map((review) => <DisplayReview review={review} key={review.id} />)}
            </div>
            <h2 onClick={() => setDisplayRatings(!displayRatings)}>Ratings</h2>
            <div>
                { displayRatings && user.ratings.map((rating) => <DisplayRating rating={rating} key={rating.id} />)}
            </div>
        </div>
}

function DisplayReview({ review }) {
    return <div>
        <div>For Movie: {review.movieId}</div>
        <div>{review.content}</div>
    </div>
}

function DisplayRating({ rating }) {
    return <div>
            <div>For Movie: {rating.movieId}</div>
            <div>{rating.score}</div>
        </div>
}

export default function Account() {
    //const { user } = useContext(AuthContext);
    const user = {
        id: 1202,
        username : "rico",
        email: "rich@gmail.com",
        password: "password",
        createdAt: "10:11:10:02",

        reviews: [{
            id: "1022",
            content: "Movie 1: words words words words words words words words words words words words words words words",
            submittedAt: "10:12:12:04",
            //for: movie,
            movieId: 123,
            //by: user,
            userId: "1202"
        },
        {
            id: "1023",
            content: "Movie 2: words words words words words words words words words words words words words words words",
            submittedAt: "10:12:19:53",
            //for: movie,
            movieId: 231,
            //by: user,
            userId: "1202"
        },
        {
            id: "1024",
            content: "Movie 3: words words words words words words words words words words words words words words words",
            submittedAt: "10:12:24:32",
            //for: movie,
            movieId: 242,
            //by: user,
            userId: "1202"
        }],

        ratings: [{
            id: "1022",
            score: 3,
            submittedAt: "10:12:12:04",
            //for: movie,
            movieId: 123,
            //by: user,
            userId: "1202"
        },
        {
            id: "1022",
            score: 4,
            submittedAt: "10:12:12:04",
            //for: movie,
            movieId: 123,
            //by: user,
            userId: "1202"
        }],

        //not sure if list and requests are needed atm
        // list: [{
        //     id: ""
        // }],
        // requests: []
    }

    return <div>{user ? <AccountInfo user={user} /> : <LoginOrSignup />}</div>;
}

/*
TO-DO
format (not sure what it should look like or how to do)
user should work once backend is done bc object is laid out the same as backend
add links to each review/rating to go to that review on the movie
keys might need to change but idk
*/
