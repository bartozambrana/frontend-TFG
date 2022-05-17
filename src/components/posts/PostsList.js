import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import { PostItem } from "./PostItem";

export const PostsList = () => {
  //Ejecutador de las acciones.
  const dispatch = useDispatch();

  //Obtenemos el identificador del servicio introducido.
  const { idService } = useParams();
  //Obtenemos los posts de los states.
  const { uidServicePosts, postsLastService } = useSelector(
    (state) => state.posts
  );

  //Realizamos la petición de los posts cuando sea necesario.
  useEffect(() => {
    //Observamos que no hayan sido cargados anteriormente.
    if (uidServicePosts !== idService) {
      dispatch(getPosts(idService));
    }
  }, [dispatch, idService, uidServicePosts]);

  return (
    <>
      {postsLastService.map((post) => {
        return <PostItem key={post.uid} post={post} />;
      })}
    </>
  );
};
