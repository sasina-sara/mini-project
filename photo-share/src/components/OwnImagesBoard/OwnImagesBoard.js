import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import TitlebarGridList from "components/TitlebarGridList";
import ShowImagesDialog from "components/ShowImageDialog/ShowImageDialog";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import EditImageDialog from "components/EditImageDialog";
import EditImageTool from "components/EditImageTool";

const OwnImagesBoard = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState({
    index: -1,
    value: null,
  });

  const storageRef = firebase.storage().ref();
  const imagesRef = storageRef.child("images");

  const { user, userLoad } = useFirebaseAuth();

  useEffect(() => {
    if (!userLoad) {
      console.log({ user });
      const unsubscribe = firebase
        .firestore()
        .collection("images")
        .where("user_id", "==", `${user.uid}`)
        // .orderBy("upload_time", "desc")
        .onSnapshot(
          (querySnapshot) => {
            let images = [];
            setImages([]);
            querySnapshot.forEach(async (doc) => {
              let current = doc.data();
              let currentId = doc.id;

              let currentFileURL = await imagesRef
                .child(current.filename)
                .getDownloadURL();

              console.log({ currentFileURL });

              current = Object.assign({}, current, {
                originFilename: current.filename,
              });

              current.filename = currentFileURL;

              current = Object.assign({}, current, { id: currentId });

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
    }
  }, [userLoad]);

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
      {editing ? (
        <EditImageTool
          data={selected}
          onCancel={() => {
            setEditing(false);
            setSelected({ index: -1, value: null });
          }}
        />
      ) : (
        <>
          <TitlebarGridList
            onSelect={(value, index) => {
              setSelected({
                index: index,
                value: value,
              });
            }}
            titleData={images}
          />
          <EditImageDialog
            data={selected.value}
            open={selected !== -1 ? true : false}
            onClose={() => {
              setSelected({
                index: -1,
                value: null,
              });
            }}
            onEdit={() => {
              setEditing(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default OwnImagesBoard;
