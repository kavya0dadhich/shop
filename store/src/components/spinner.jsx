import { ProgressSpinner } from 'primereact/progressspinner';


export const Spinner = () => {
  return (
    <>
      <div className='absolute top-0 left-0 w-screen flex justify-center items-center h-screen bg-slate-800/50 z-30'>
      <ProgressSpinner
        style={{ width: "80px", height: "80px" }}
        strokeWidth="4"
        animationDuration=".5s"
      />
      </div>
    </>
  );
};
