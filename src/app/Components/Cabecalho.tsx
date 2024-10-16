import Menu from './Menu'

export default function Cabecalho() {
    return (
        <header className='bg-pink-100 min-h-20 p-5 flex justify-evenly items-center'>
            <h1 className='text-4xl text-pink-300'>Cannoli</h1>
            <Menu />
        </header>
    )
}
