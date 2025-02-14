import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import {HiOutlineExclamationCircle} from 'react-icons/hi'


const DashComments = () => {

    const {currentUser} = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');
    // console.log(currentUser._id);
    // console.log(userPosts);
    useEffect(() => {
        const fetchComments = async() => {
            try{
                const res = await fetch(`/api/comment/getcomments`)
        
                const data = await res.json();
              
                if(res.ok){
                    setComments(data.comments)
                    if(data.comments.length < 2){
                        setShowMore(false);
                    }
                }
            }catch(error){
                console.log(error.message);
            }
        };

        if(currentUser.isAdmin){
            fetchComments();
        }
        
        
    }, [currentUser._id, currentUser.isAdmin]);

    const handleShowMore = async() => {
        const startIndex = comments.length;
        try{
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
            const data = await res.json();
            if(res.ok){
                setComments((prev) => [...prev, ...data.comments]);
                if(res.comments.length < 9){
                    setShowMore(false);
                }
            }
        }catch(error){
            console.log(error.message);
        }
    }

    const handleDeleteComment = async() => {
        setShowModal(false);
        try{
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
                method : 'DELETE',
            });

            const data = await res.json();
            if(res.ok){
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
                setShowModal(false);
            }else{
                console.log(data.message);
            }
        }catch(error){
            console.log(error.message);
        }
    }

  
    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
        scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500
        "
        >
            {
                currentUser.isAdmin && comments.length > 0 ? (
                    <>
                    <Table hoverable className="shadow-md" >
                        <Table.Head>
                            <Table.HeadCell>Date Updated</Table.HeadCell>
                            <Table.HeadCell>Comment content</Table.HeadCell>
                            <Table.HeadCell>Number of Likes</Table.HeadCell>
                            <Table.HeadCell>PostId</Table.HeadCell>
                            <Table.HeadCell>UserId</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {comments.map((comment) => (
                            <>
                             <Table.Body className="divide-y" key={comment._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                  {comment.content}
                                </Table.Cell>
                                <Table.Cell>
                                  {comment.numberOflikes}
                                </Table.Cell>
                                <Table.Cell>
                                    <span className="font-medium text-gray-900 dark:text-white">{comment.postId}</span>
                                </Table.Cell>
                                <Table.Cell>
                                    {comment.userId}
                                </Table.Cell>
                                <Table.Cell>
                                    <span onClick={() => {
                                        setShowModal(true);
                                        setCommentIdToDelete(comment._id);
                                    }}
                                    className="font-medium text-red-500 hover:underline cursor-pointer">
                                        Delete
                                    </span>
                                </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            </>
                           
                        ))}
                    </Table>
                    {
                        showMore && (
                            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
                                Show More
                            </button>
                        )
                    }
                    </>
                ) : 
                (
                    <p>No Comments</p>
                )}

       {/* Delete User Modal */}
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
                                    <Button color='failure' onClick={handleDeleteComment}>
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
    );
}

export default DashComments;

