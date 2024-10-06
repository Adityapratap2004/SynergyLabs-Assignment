import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";

const initialState={
    users:[],
    isLoading:false,
    isDeleting:false,
    isCreating:false,
    isEditing:false,
    success:"",
    error:null,
}
export const fetchUser = createAsyncThunk('user/fetchUser',
    async (_,{rejectWithValue}) => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await res.json();
            return data;
        } catch (error) {
           return rejectWithValue({ message: error.message });
        }
    }
)

export const deleteUser=createAsyncThunk('user/deleteUser',
    async(id,{rejectWithValue})=>{
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
                method:'DELETE'
            });
            const data = await res.json();
            data.id=id;
            return data;
        } catch (error) {
           return rejectWithValue({ message: error.message });
        }
        
    }
)

export const createUser=createAsyncThunk('user/createUser',
    async(user,{rejectWithValue})=>{
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users`,{
                method:'POST',
                body:JSON.stringify({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        username: user.username,
                        website:user.website,
                        address: {
                          suite: user.suite,
                          street: user.street,
                          city: user.city,
                          zipcode: user.zipcode,
                        },
                        company: {
                          name: user.cname,
                          catchPhrase: user.catchphrase,
                          bs: user.bs,
                        },
                }),
                headers:{
                    'Content-type':'application/json'
                }
            });

            const data=await res.json();
            return data;
        } catch (error) {
           return rejectWithValue({ message: error.message });
        }
        
    }
)

export const editUser=createAsyncThunk('user/editUser',
    async(user,{rejectWithValue})=>{
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`,{
                method:'PUT',
                body:JSON.stringify({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        username: user.username,
                        website:user.website,
                        address: {
                          suite: user.suite,
                          street: user.street,
                          city: user.city,
                          zipcode: user.zipcode,
                        },
                        company: {
                          name: user.cname,
                          catchPhrase: user.catchphrase,
                          bs: user.bs,
                        },
                }),
                headers:{
                    'Content-type':'application/json'
                }
            });

            const data=await res.json();
            return data;
        } catch (error) {
           return rejectWithValue({ message: error.message });
        }
        
    }
)
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError:(state)=>{
            state.error=null
        },
        clearSuccess:(state)=>{
            state.success=""
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.isLoading=true
            state.error=null
        })
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=action.payload
        }) 
        builder.addCase(fetchUser.rejected,(state,action)=>{
            
            state.isLoading=false
            state.error=action.payload.message
        })


        
        builder.addCase(deleteUser.pending,(state)=>{
            state.isDeleting=true
            state.error=null
            state.success=""
        })
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.isDeleting=false
            state.users=state.users.filter((user)=>user.id!==action.payload.id)
            state.success="User Deleted"

        })
        builder.addCase(deleteUser.rejected,(state,action)=>{
            state.isDeleting=false
            state.error=action.payload.message
            state.success=""
        })


        builder.addCase(createUser.pending,(state)=>{
            state.isCreating=true
            state.error=null
            state.success=""
        })
        builder.addCase(createUser.fulfilled,(state,action)=>{
            state.isCreating=false
            state.users.push(action.payload);
            state.success="User Added"

        })
        builder.addCase(createUser.rejected,(state,action)=>{
            state.isCreating=false
            state.error=action.payload.message
            state.success=""
        })

        builder.addCase(editUser.pending,(state)=>{
            state.isEditing=true
            state.error=null
            state.success=""
        })
        builder.addCase(editUser.fulfilled,(state,action)=>{
            state.isEditing=false
            state.users=state.users.map((user)=>{
                if(user.id===action.payload.id){
                    return action.payload
                }
                return user;
            })
            state.success="User Updated"

        })
        builder.addCase(editUser.rejected,(state,action)=>{
            state.isEditing=false
            state.error=action.payload.message
            state.success=""
        })
    }

})
export const {clearError,clearSuccess}=userSlice.actions
export default userSlice.reducer;