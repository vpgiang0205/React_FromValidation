
const initialState = {
    listSV: [
        {
            masv: "1",
            tensv: "Nguyen Van A",
            sdt: "0123456790",
            email: "vophonggiangABC@gmail.com"
        }
        , {
            masv: "2",
            tensv: "Nguyen Van B",
            sdt: "0123456790",
            email: "vophonggiangABC@gmail.com"
        }
        , {
            masv: "3",
            tensv: "Nguyen Van C",
            sdt: "0123456790",
            email: "vophonggiangABC@gmail.com"
        }
    ],
    svEdit: null,
    keyword: "",
}

const svReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SV': {
            const newSV = action.payload;
            let duplicateFound = state.listSV.some((sv) => sv.masv === newSV.masv);
            
            if (duplicateFound) {
              alert("Mã nhân viên đã tồn tại!");
              return state; // Return the current state without making any changes
            } else {
              return {
                ...state,
                listSV: [...state.listSV, newSV],
              };
            }
          }
      

        case 'DELETE_SV': {
            return {
                ...state,
                listSV: state.listSV.filter((sv) => sv.masv !== action.payload),
            };
        }

        case 'GET_KEYWORD': {
            state.keyword = action.payload
            return { ...state };
        }

        default:
            return { ...state }
    }
}

export default svReducer;