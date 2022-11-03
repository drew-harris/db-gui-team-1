import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../api/userInfo";
import { AuthContext } from "../../context/AuthContext";

function LoginOrSignup() {
  return (
    <div>
      <Link to="/login">Login</Link>
      <div> or </div>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

function AccountInfo({ userId }) {
  const {
    data: userInfo,
    error,
    isLoading,
  } = useQuery(["user"], () => getUserInfo(userId));

  if (!userInfo) {
    return null;
  }

  return (
    <div>
      <h1>{userInfo.user.username}</h1>
      <div>{userInfo.user.email}</div>
      {JSON.stringify(userInfo, null, 4)}
    </div>
  );
}

function DisplayReview({ review }) {
  return (
    <div>
      <div>For Movie: {review.movieId}</div>
      <div>{review.content}</div>
    </div>
  );
}

function DisplayRating({ rating }) {
  return (
    <div>
      <div>For Movie: {rating.movieId}</div>
      <div>{rating.score}</div>
    </div>
  );
}

export default function Account() {
  const user = useContext(AuthContext);
  return (
    <div>
      {user ? <AccountInfo userId={user.user.id} /> : <LoginOrSignup />}
    </div>
  );
}
