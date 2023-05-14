function Addbudget()
{
    return(
        <>
        <div className="mt-10 pb-2 text-sm font-bold text-center">
            Add Budget
        </div>
        <div className="pl-10 pr-10 rounded-2xl">
        <form className="grid">
            <div className="grid mt-4">
            Pilih Budget 
            <select name="budget"id="" title="Budget"className="rounded-md pl-2" >
            <option value="">Budget</option>
            </select>
            </div>
            <div className="grid mt-4">
            Amount
            <div className="flex justify-between ">
            <select name="budget"id="" title="Budget" className="rounded-md pl-2" >
            <option value="">Set Angka </option>
            </select>
            <p>pembagian bentuk persen</p> 
            </div>
            </div>
            
            <div className="grid mt-4">
            Description
            <input type="text" name="description" id="" placeholder="Description" className="rounded-md pl-2"/>
            </div>
            
        
        </form>
        </div>
        </>
    )
}
export default Addbudget