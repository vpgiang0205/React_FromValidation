
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