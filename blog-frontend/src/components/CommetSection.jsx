/* eslint-disable react/prop-types */
import {useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {Textarea, Button, Alert, Modal} from 'flowbite-react';
import { useState, useEffect } from 'react';
import Comment from './Comment';
import {HiOutlineExclamationCircle} from 'react-icons/hi';

function CommetSection({postId}) {

    const {currentUser} = useSelector((state) => state.user);   
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

    const navigate = useNavigate();

    // console.log(comments);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(comment.length > 200){
            return;
        }

        try{
            const res = await fetch(`/api/comment/create`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({ content : comment, postId, userId : currentUser._id })
            });
    
            const data = await res.json();
            if(res.ok){
                setComment('');
                setCommentError(null);
                setComments([data, ...comments]);
            }
        } catch(error){
            setCommentError(error.message);
        }
    };

    useEffect(() => {
        const getComments = async() => {
            try{
                const res = await fetch(`/api/comment/getPostComments/${postId}`);
                if(res.ok){
                    const data = await res.json();
                    // console.log(data);
                    setComments(data);
                }
            }catch(error){
                console.log(error);
            }
        }
        getComments();
    }, [postId]);

    const handleLike = async(commentId) => {
        try{
            if(!currentUser){
                navigate('/signIn');
                return;
            }

            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method : 'PUT', 
            });

            if(res.ok){
                const data = await res.json();
                setComments(comments.map((comment) => 
                    comment._id === commentId ? {
                        ...comment,
                        likes : data.likes,
                        numberOflikes : data.likes.length
                    } : comment
                ))
            }
        }catch(error){
            console.log(error.message);
        }
    };

    const handleEdit = async(comment, editedContent) => {
        setComments(comments.map((c) => 
            c._id === comment._id ? { ...c, content : editedContent} : c
        ))
    };

    const handleDelete = async(commentId) => {
        setShowModal(false);
        try{
            if(!currentUser){
                navigate('/signIn');
                return;
            }

            const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
                method : "DELETE"
            });

            if(res.ok){
                const data = await res.json();
                setComments(comments.filter((comment) => comment._id !== commentId));
                  
            }
        }catch(error){
            console.log(error);
        }
    };
  return (
    <div className='max-w-2xl mx-auto w-full p-3 '>
        {currentUser ? (
            <>
                <div className='flex items-center  gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img className = "w-5 h-5 object-cover rounded-full" src={currentUser.profilePicture} alt="" />
                    <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-500 hover:underline'>
                        @{currentUser.userName}
                    </Link>
                </div>
            </>
        ) : 
        (
            <>
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be Sign in to comment
                    <Link className = 'text-blue-500 hover:underline' to={'/signIn'}>
                        Sign In
                    </Link>
                </div>
            </>
        )}
        {
            currentUser && (
                <form onSubmit={handleSubmit} className='border border-teal-500 p-3 rounded-md'>
                    <Textarea
                        className='p-2'
                        placeholder = 'Add a comment'
                        rows = '3'
                        maxLength = '200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-sm'>{200 - comment.length} characters remaining</p>
                        <Button
                            type='submit'
                            gradientDuoTone='purpleToBlue'
                            outline
                        >
                            Comment
                        </Button>
                    </div>
                    {commentError && (
                        <Alert color='failure' className='mt-5 '>
                        {commentError}
                        </Alert>
                    )}
                </form>
            )}

            {comments.length === 0 ? (
                <>
                    <p className='text-sm my-5'>No comments yet!</p>
                </>
            ) : (
                <>
                    <div className='text-sm my-5 flex items-center gap-1'>
                        <p>Comments</p>
                        <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                            <p>{comments.length}</p>
                        </div>
                    </div>

                    {
                        comments.map(comment => (
                            <Comment 
                                key={comment._id}
                                comment = {comment}
                                onLike = {handleLike}
                                onEdit = {handleEdit}
                                onDelete={(commentId) => {
                                    setShowModal(true)
                                    setCommentToDelete(commentId);
                                }}
                            />
                        ))
                    }
                </>
            )}
             {/* Delete Comments Modal */}
             <Modal 
                        show={showModal} 
                        onClose={() => setShowModal(false)}
                        popup
                        size='md'
                        >
                         <Modal.Header />
                         <Modal.Body>
                            <div className="text-center">
                                {/* icon */}
                                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                                <h3 className='mb-5 text-lg tex-gray-500'>Are you sure you want to delete this comment</h3>
                                <div className='flex justify-center gap-4 mb-4'>
                                    <Button color='failure' onClick={() => handleDelete(commentToDelete)}>
                                        Yes, I&apos;m sure
                                    </Button>
                
                                    <Button color='gray' onClick={() => setShowModal(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                         </Modal.Body>
                
                        </Modal>
    </div>
  )
}

export default CommetSection
