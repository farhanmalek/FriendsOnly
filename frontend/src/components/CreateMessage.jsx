



function CreateMessage() {
  return (
    <div className="border border-black w-[85vw] min-h-[20vh] rounded-md shadow-md bg-blue-200 flex flex-col gap-1">
      <div className="flex justify-between mr-2 ml-2">
        <p>Title</p>
        <p>Time</p>
      </div>
      <p className="ml-2">Author</p>
      <p className="ml-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto,
        maiores pariatur. Accusamus aut nobis deserunt! Culpa dicta commodi
        cumque aut.
      </p>
    </div>
  );
}

export default CreateMessage;
