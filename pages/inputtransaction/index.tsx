function InputTransaction()
{
    return(
        <>
        <div className="mt-10 pb-2 text-sm font-bold flex justify-between">
           <div className=" ml-8 pb-3 pt-3 pl-6 pr-6 bg-white rounded-2xl text-lg">
            Pemasukan
           </div>
           <div className=" mr-8 pb-3 pt-3 pl-6 pr-6 bg-white rounded-2xl text-lg">
            Pengeluaran
           </div>
        </div>
        <div className="pl-10 pr-10 rounded-2xl">
        <form className="grid">
            <div className="grid mt-4">
            Tanggal 
            <input type="date" id="date" placeholder="date" className="rounded-md pl-2"/>
            </div>
            <div className="grid mt-4">
            Jumlah Uang
            <div>
            <input type="int" name="amount" placeholder="Amount" className="rounded-md pl-2"/>
            </div>
            </div>
            <div className="grid mt-4">
            Keterangan
            <input type="text" name="description" id="" placeholder="Masukan Keterangan" className="rounded-md pl-2"/>
            </div>
            <div className="grid mt-4">
            Kategori budget
            <select name="kategori"id="" title="katerori" className="rounded-md pl-2" >
            <option value="">choose </option>
            </select>
            </div>
            
        <input type="submit" name="save" placeholder="SAVE" id="" className=" bg-white rounded-2xl mt-4"/>
        </form>
        </div>
        </>
    )
}
export default InputTransaction