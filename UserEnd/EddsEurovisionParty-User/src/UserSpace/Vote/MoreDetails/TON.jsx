export const TON = ({ detail }) => {
  return (
    <div className="border-amber-600 border-4 m-3 rounded-lg">
      <h3 className="text-md font-bold">Totally Objective Notes</h3>
      {typeof detail.content == "string" && (
        <p className="text-sm"> {detail.content}</p>
      )}
      {typeof detail.content == "object" && (
        <div className="flex flex-col">
          {detail.content.map((item, index) => (
            <>
              <p key={index} className="text-sm">
                {item}
              </p>
              <div className="h-6"> </div>
            </>
          ))}
        </div>
      )}
    </div>
  );
};
