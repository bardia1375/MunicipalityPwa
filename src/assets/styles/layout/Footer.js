import styled from "styled-components";

// export const Container = styled.footer`
//   display: flex;
//   align-items: center;
//   height: 50px;
//   padding: 0.5rem 1.25rem;
//   margin: 0rem auto 0;
//   border-radius: 2rem 2rem 0 0;
//   border: 1px solid #75c9db4d;
//   background: ${({ theme }) => theme.color.light};
//   box-shadow: inset 0px 0px 80px #75c9db80, 0px -3px 3px #8125254d;
//   transition: 500ms;

//   &:hover {
//     /* transform: scaleY(1.05); */
//     height: 55px;
//     padding: 0 1.75rem;
//   }
// `;

// export const Copy = styled.div`
//   width: 40%;

//   @media (min-width: 1100px) {
//     width: 34.3333%;
//   }
// `;

// export const Icons = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;

//   img {
//     height: 20px;
//   }

//   @media (min-width: 1100px) {
//     img {
//       height: 28px;
//     }
//   }
// `;

// export const Logo = styled.div`
//   img {
//     width: 80px;
//   }

//   @media (min-width: 1100px) {
//     img {
//       width: 100px;
//     }
//   }
// `;

export const AppbottomHead = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: center;
  direction: rtl;
  height: 50%;
`;

export const Tikmentfooter = styled.div`
  background-color: #d7ebee;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 10vw;
  height: 55px;
  width: 90%;
  border-top-left-radius: 20px;
  border: 1px solid #75c8db52;
  border-top-right-radius: 20px;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.3);
  transition: all 0.5s;
  margin-left: auto;
  margin-right: auto;
  :hover {
    /* cursor: pointer; */
    /* width: 550px; */
    /* padding-top: 10px; */
  }
  & span {
    display: block;
    color: #04165d;
    font-weight: 900;
  }
  & h5 {
    color: #04165d;
    font-weight: 900;
  }
`;

export const Appvlthree = styled.div`
  margin: 0px 10px;
  border-left: 1px solid #daa210;
  height: 26px;
`;

export const Home = styled.img`
  /* margin: 0px 3px; */
  background: ${({ selected }) =>
    selected === "Instagram" ? "rgba(214, 238, 244, 0.95)" : null};
  border: ${({ selected }) =>
    selected === "Instagram" ? "1px solid rgba(86, 172, 194, 0.6)" : null};
  /* backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px); */
  padding-left: 10vw;
  padding-right: 10vw;
  padding-bottom: 2vw;
  padding-top: 2vw;
  margin-right: -7vw;
  margin-top: 2.5vw;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom: none;
`;

export const Messages = styled.img`
  /* margin: 0px 3px; */
  background: ${({ selected }) =>
    selected === "Twitter" ? "rgba(214, 238, 244, 0.95)" : null};
  border: ${({ selected }) =>
    selected === "Twitter" ? "1px solid rgba(86, 172, 194, 0.6)" : null};
  /* backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px); */
  padding-left: 10vw;
  padding-right: 10vw;
  padding-bottom: 2vw;
  padding-top: 2vw;
  margin-left: -7vw;
  margin-top: 2.5vw;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom: none;
`;

export const Tickfooter = styled.div`
  object-fit: contain;
`;
