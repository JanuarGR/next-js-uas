import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  odtServiceDestroy,
  odtServiceEdit,
} from "@/services/odt-service";
import Head from "next/head";
import Layout from "@/components/organisms/Layout";
import Button from "@/components/atoms/Button";
import { odtType } from "@/services/data-types/odt-type";

export default function DeleteOdt({
  odtDetail,
  id,
}: {
  odtDetail: odtType;
  id: string;
}) {
  const [datas, setDatas] = useState<odtType>(odtDetail);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    nama_odt: "",
    tipe_odt: "",
    harga_odt: "",
  });

  const onSubmit = async () => {
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("nama_odt", datas.nama_odt);
      data.append("tipe_odt", datas.tipe_odt || "");
      data.append("harga_odt", datas.harga_odt || "");

      const response = await odtServiceDestroy(id);

      if (!response.error) {
        alert("odt Delete unccessfully");
        window.location.href = "/";
      } else {
        if (response.message) {
          Object.entries(response.message).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              setIsError({ ...isError, [key]: "is-invalid" });
              alert(value[0]);
            }
          });
        }
      }
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Layout>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Hapus Data Obat dan Tindakan</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">odt</li>
            <li className="breadcrumb-item active">hapus data odt</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-7 mb-4">
                  <div className="mb-3"></div>
                  <h3>
                    Apakah Anda Ingin Menghapus Data {datas.nama_odt} ?
                  </h3>
                  <Button
                    type="button"
                    onClickButton={onSubmit}
                    className={["btn btn-danger"]}
                  >
                    Hapus
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

interface GetServerSideProps {
  params: {
    id: string;
  };
}

export async function getServerSideProps({ params }: GetServerSideProps) {
  const { id } = params;

  const response = await odtServiceEdit(id);

  return {
    props: {
      odtDetail: response.data,
      id: id,
    },
  };
}
