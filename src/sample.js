import React from "react";
import { FormsViewStyles } from "../index";
import PlusIcon from "assets/images/common/plus/white-color-yellow-bg.svg";
import add from "assets/images/chart.js/addhover.svg";

import { Typography } from "components/common";
import { useState } from "react";
// import { Field } from "routes/Home/WorkControl/FormBuilder/Field";
import Tick from "assets/images/common/tick/secondary-bg.svg";
import Close from "assets/images/common/close/white-color-red-bg.svg";
import { useRef } from "react";
import FormsCardView from "./FormsCardView";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteRelationForms,
  PostRelationForms,
  UpdateRelationForms,
} from "../Module";
import { fetchForms } from "routes/Home/FormGenerator/Module";
import { fetchTimings } from "routes/Home/Timing/Module";
import { DeleteModal } from "components/common/DeleteModal";

function FormsView({ title, Relations, AddFormsRelationIndex, items }) {
  const [addCard, setAddCard] = useState(true);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [unique, setUnique] = useState();
  const { Token } = useSelector((state) => state.auth);
  let pageSize = 50;

  // const api = [
  //   {
  //     card: [
  //       { title: "1جلب رضایت مشتریان از طریق بهترین خدمات", id: "1" },
  //       { title: "1جلب رضایت مشتریان از طریق بهترین خدمات", id: "2" },
  //       { title: "1جلب رضایت مشتریان از طریق بهترین خدمات", id: "3" },
  //     ],
  //   },
  // ];
  const [enteredTitle, setEnteredTitle] = useState("");
  const [cards, setCards] = useState();
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [crud, setCrud] = useState(true);
  const [idDeleted, setIdDeleted] = useState("");
  const [notShowDeletebox, setnotShowDeletebox] = useState(false);
  const [onEditFiled, setOnEditFiled] = useState(true);


  let newProp = {
    isDeleteMode: isDeleteMode,
  };
  if (AddFormsRelationIndex == 1) {
    setCards(items?.SourcePosition?.Relations);
  } else if (AddFormsRelationIndex == 2) {
    setCards(items?.TargetPosition?.Relations);
  }
  const showCards = () => {
    setAddCard(!addCard);
    dispatch(fetchForms(Token, 1, 50));
    dispatch(fetchTimings(Token, 1, 50));
  };

  const onChageData = (data, UniqueId) => {
    const relationsId = JSON.parse(localStorage.getItem("relationsId"));
    if (UniqueId || UniqueId == 0) {
      const newDate = {
        ...data,
        Unique: UniqueId,
      };

      dispatch(UpdateRelationForms(Token, newDate));
      const card = [...cards];
      // card[index].title = titles;
      // setCards(card);
      setIsDeleteMode(false);
    } else {
      if (AddFormsRelationIndex == 1) {
        const newDate = {
          ...data,
          SourcePositionUnique: relationsId.SourceUnique,
          TargetPositionUnique: relationsId.TargetUnique,
        };
        dispatch(
          PostRelationForms(Token, newDate, items, AddFormsRelationIndex)
        );
      } else if (AddFormsRelationIndex == 2) {
        const newDate = {
          ...data,
          SourcePositionUnique: relationsId.TargetUnique,
          TargetPositionUnique: relationsId.SourceUnique,
        };
        dispatch(
          PostRelationForms(Token, newDate, items, AddFormsRelationIndex)
        );
      }

      setAddCard(!addCard);
      setEnteredTitle("");
      setAddCard(!addCard);
    }
  };

  const onDeleteChange = useCallback(
    (index, unique) => {
      setIsDeleteMode(true);
      setIdDeleted(index);
      setnotShowDeletebox(false);
      setUnique(unique);
      // const Card = [...cards];
      // Card.splice(index, 1);
      // setCards(Card);
    },
    [idDeleted, unique]
  );

  const DeleteHandler = () => {
    //  if (deleteCause === null) return;
    dispatch(DeleteRelationForms(Token, unique));
    //  dispatch(fetchViewSpiderChart(Token,1,50));
  };

  const blurEdit = (index) => {
    setIsDeleteMode(true);
    setIdDeleted(index);
    setnotShowDeletebox(true);
  };

  const enableDeleteModeHandler = (bool) => setIsDeleteMode(bool);
  const disableDeleteModeHandler = (bool) => setIsDeleteMode(bool);
  const closeAddCard = () => {
    setAddCard(true);
  };
  const closeDeleteMode = () => {
    setIsDeleteMode(false);
  };

  return (
    <>
      {isDeleteMode && (
        <DeleteModal
          notShowDeletebox={notShowDeletebox}
          type="فرم"
          onClose={disableDeleteModeHandler}
          DeleteHandler={DeleteHandler}
        />
      )}
      <FormsViewStyles.Box isDeleteMode={isDeleteMode} idDeleted={idDeleted}>
        <FormsViewStyles.Forms>{title}</FormsViewStyles.Forms>
        {cards?.map((el, index) => {
          return (
            <div key={el.id}>
              <FormsCardView
                onChageData={onChageData}
                onDeleteChange={onDeleteChange}
                FormsName={el.Form.Name}
                TimmingName={el.Timming.Name}
                index={index}
                closeAddCard={closeAddCard}
                blurEdit={blurEdit}
                idDeleted={idDeleted}
                newProp={newProp}
                closeDeleteMode={closeDeleteMode}
                UniqueId={el.Unique}
                ExpireTime={el.ExpireTime}
                GenerateTime={el.GenerateTime}
                TimmingUniqueTemplates={el.TimmingUnique}
              />
            </div>
          );
        })}
        {/* AddCard */}
        <FormsViewStyles.AddCard>
          {addCard ? (
            <FormsViewStyles.AddCardIcon
              src={add}
              width="40px"
              onClick={showCards}
            />
          ) : (
            <FormsCardView
              onChageData={onChageData}
              onDeleteChange={onDeleteChange}
              closeAddCard={closeAddCard}
              editCards
            />
          )}
        </FormsViewStyles.AddCard>
      </FormsViewStyles.Box>
    </>
  );
}

export default FormsView;
