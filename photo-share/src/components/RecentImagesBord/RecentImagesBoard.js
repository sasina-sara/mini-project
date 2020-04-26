import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import TitlebarGridList from "components/TitlebarGridList";

const RecentImagesBoard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const storageRef = firebase.storage().ref();
  const imagesRef = storageRef.child("images");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("images")
      .orderBy("upload_time", "desc")
      .limit(12)
      .onSnapshot(
        (querySnapshot) => {
          let images = [];
          setImages([]);
          querySnapshot.forEach(async (doc) => {
            let current = doc.data();

            let currentFileURL = await imagesRef
              .child(current.filename)
              .getDownloadURL();

            console.log({ currentFileURL });

            current.filename = currentFileURL;

            images.push(current);

            setImages((prev) => [...prev, current]);
            setLoading(false);
          });
        },
        (error) => {
          console.error(error);
        }
      );
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log({ images });
  }, [images]);

  if (loading) {
    return <div>Images loading...</div>;
  }

  return (
    <div>
      <TitlebarGridList titleData={images} />
    </div>
  );
};

export default RecentImagesBoard;
