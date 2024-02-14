import Layout from "../../components/Layout";
import clienteAxios from "../../config/clienteAxios";

export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const { data } = await clienteAxios(`/enlaces/${enlace}`);
  // console.log(data)
  return {
    props: {
      enlace: data,
    },
  };
}

export async function getServerSidePaths() {
  const { data } = await clienteAxios("/enlaces");
  // console.log(data)
  return {
    paths: data.enlaces.map((enlace) => ({
      params: { enlace: enlace.url },
    })),
    fallback: false,
  };
}

export default ({ enlace }) => {
  console.log(enlace);
  return (
    <Layout>
      <h1 className="text-4xl text-center text-gray-700">
        Descarga tu Archivo
      </h1>
      <div className="flex items-center justify-center mt-10">
        <a
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/archivos/${enlace.archivo}`}
          className="bg-red-500 text-center py-3 px-10 rounded-md uppercase text-white font-bold hover:bg-black"
        >
          Aquí
        </a>
      </div>
    </Layout>
  );
};
