import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import TitlebarGridList from "components/TitlebarGridList";
import ShowImagesDialog from "components/ShowImageDialog/ShowImageDialog";

const RecentImagesBoard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

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

  useEffect(() => {
    console.log({ selected });
  }, [selected]);

  if (loading) {
    return <div>Images loading...</div>;
  }

  return (
    <div>
      <TitlebarGridList
        onSelect={(value) => {
          setSelected(value);
        }}
        titleData={images}
      />
      <ShowImagesDialog
        data={selected}
        open={selected ? true : false}
        onClose={() => {
          setSelected(null);
        }}
      />
    </div>
  );
};

export default RecentImagesBoard;
