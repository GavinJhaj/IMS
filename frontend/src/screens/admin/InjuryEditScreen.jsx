import React,{useEffect,useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom'
import {Button,Row,Col,Table,Form} from 'react-bootstrap';
import {FaTimes,FaEdit,FaTrash} from 'react-icons/fa'
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer'
import {useGetUsersQuery} from '../../slices/usersApiSlice';
import {useUpdateProductMutation,useGetProductDetailsQuery,useUploadProductImageMutation} from '../../slices/productsApiSlice';
import { useSelector,useDispatch } from 'react-redux/';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Autosuggest from 'react-autosuggest';
import Select from 'react-select';

const InjuryEditScreen = () => {

    const {id:productId}=useParams();

    const [name,setName]=useState('');
    const [dateOf,setdateOf]=useState(0);
    const [image,setImage]=useState('');
    const [brand,setBrand]=useState('');
    const [category,setCategory]=useState('');
    const [countInStock,setCountInStock]=useState(0);
    const [description,setDescription]=useState('');

    const {data:product,isLoading,refetch,error} =useGetProductDetailsQuery(productId);

    const [updateProduct,{isLoading:loadingUpdating}] =useUpdateProductMutation();

    const [uploadProductImage,{isLoading:loadingUpload}] =useUploadProductImageMutation();


// add
// const [validationError, setValidationError] = useState(null);


    const {data:users, isLoading:usersLoading, error:usersError} = useGetUsersQuery();

    const customStyles = {
        control: provided => ({
          ...provided,
          minHeight: 'calc(2em + .75rem + 2px)', // match Bootstrap's form-control height
          borderRadius: '.25rem', // match Bootstrap's border radius
          borderColor: '#ced4da', // match Bootstrap's border color
          boxShadow: 'none', // remove default react-select's box shadow
          '&:hover': {
            borderColor: '#ced4da' // match Bootstrap's border color on hover
          }
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#7B8A8B' : state.isFocused ? '#f8f9fa' : null,
          color: state.isSelected ? 'white' : 'black',
          padding: '.55rem .5rem' // match padding for Bootstrap's dropdown items
        }),
        menu: provided => ({
          ...provided,
          borderRadius: '.35rem' // match Bootstrap's dropdown menu border radius
        }),
        singleValue: provided => ({
          ...provided,
          color: '#7B8A8B' // match Bootstrap's form-control text color
        }),
      };

    // const [suggestions, setSuggestions] = useState([]);


    // const getSuggestions = value => {
    //     const inputValue = value.trim().toLowerCase();
    //     const inputLength = inputValue.length;

    //     return inputLength === 0 ? [] : users.filter(user =>
    //         user.name.toLowerCase().slice(0, inputLength) === inputValue
    //     );
    // };

    // const getSuggestionValue = suggestion => suggestion.name;

    // const theme = {
    //     input: 'form-control',
    //     inputOpen: 'form-control',
    //     inputFocused: 'form-control',
    //     suggestionsContainer: 'dropdown',
    //     suggestionsContainerOpen: 'dropdown open',
    //     suggestionsList: `dropdown-menu ${suggestions.length ? 'show' : ''}`,
    //     suggestion: 'dropdown-item',
    //     suggestionHighlighted: 'dropdown-item active'
    //   };

    // add



    const navigate=useNavigate();

    useEffect(()=>{
        if(product){
           setName(product.name);
           setdateOf(product.dateOf);
           setImage(product.image);
           setBrand(product.brand);
           setCategory(product.category);
           setCountInStock(product.countInStock);
           setDescription(product.description);
        }
    },[product]);

    const submitHandler=async(e)=>{
        e.preventDefault();
        // add
        const userExists = users.find(user => user.name === name);

        // If it doesn't exist, set the validation error and return.
        if (!userExists) {
            setValidationError('Player name must be a username!');
            return;
        }
        //add
        const updatedProduct={
            productId,
            name,
            dateOf,
            image,
            brand,
            category,
            countInStock,
            description,
        };

        const result= await updateProduct(updatedProduct);
        if(result.error){
            toast.error(result.error);
        }else{
            toast.success('Injury updated');
            navigate('/admin/productlist');
        }

    }

    const uploadFileHandler=async(e)=>{
        const formData=new FormData();
        formData.append('image',e.target.files[0]);
        try {
            const res=await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (error) {
            toast.error(error?.data?.message||error.error)
            
        }
    }


  return (
    <>
    <Link to="/admin/productlist" className='btn btn-light my-3'>
    GO Back
    </Link>
    <FormContainer>
        <h2>Edit Injury</h2>
        {loadingUpdating && <Loader/>}
        {
        
            isLoading || usersLoading ?<Loader/>
            :error || usersError?<Message variant='danger'>{error || usersError}</Message>:(
                
                <Form onSubmit={submitHandler}>

<Form.Group controlId='name'>
                <Form.Label>Player Name</Form.Label>
                {/* Make sure users data exists before mapping */}
                {users && (
                  <Select 
                  styles={customStyles}
                    options={users.map(user => ({ value: user._id, label: user.name }))}
                    onChange={(selectedOption) => setName(selectedOption.label)}
                  />
                )}
             </Form.Group>
                    

                    {/* <Form.Group controlId='name'>
                        <Form.Label>Player Name</Form.Label>
                        <Autosuggest
                                    theme={theme}
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={({ value }) => {
                                        setSuggestions(getSuggestions(value));
                                    }}
                                    onSuggestionsClearRequested={() => {
                                        setSuggestions([]);
                                    }}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={getSuggestionValue}
                                    inputProps={{
                                        placeholder: 'Enter name',
                                        value: name,
                                        onChange: (_, { newValue }) => {
                                            setName(newValue);
                                        }
                                    }}
                                />
                                {validationError && <div className="invalid-feedback d-block">{validationError}</div>}
                    </Form.Group> */}

                    <Form.Group controlId='dateOf'>
                        <Form.Label>Date of Injury</Form.Label>
                        <Form.Control
                        type='date'
                        placeholder='Enter date'
                        value={dateOf}
                        onChange={(e)=>setdateOf(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

{/* image */}
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e)=>setImage}
                        ></Form.Control>

                         <Form.Control
                        type='file'
                        label='Choose file'
                        onChange={uploadFileHandler}
                        ></Form.Control>
                    </Form.Group>
                    {loadingUpload && <Loader/>}


                    <Form.Group controlId='brand'>
                        <Form.Label>Injury Type</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter Injury'
                        value={brand}
                        onChange={(e)=>setBrand(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='cetegory'>
                        <Form.Label>Action Taken</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter cetegory'
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>Action Needed</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder=''
                        value={countInStock}
                        onChange={(e)=>setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>


                    {/* <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter description'
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group> */}
                    <Button type='submit' value='primary' className='my-2'>Update</Button>
                </Form>
            )
        }
    </FormContainer>
    </>
  )
}

export default InjuryEditScreen