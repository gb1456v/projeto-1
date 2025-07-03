import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-gray-800">
          JUBS ERP
        </div>
        <div>
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">Bem-vindo, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
              >
                Sair
              </button>
            </div>
          ) : (
            <button
              // TODO: Implement login modal trigger here
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;