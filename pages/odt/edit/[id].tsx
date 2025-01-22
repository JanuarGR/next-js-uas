import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { odtType } from "@/services/data-types/odt-type";
import {
  odtServiceEdit,
  odtServiceUpdate,
} from "@/services/odt-service";

import React, { useState } from "react";

export default function Editodt({
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

      const response = await odtServiceUpdate(data, id);

      if (!response.error) {
        alert("odt edited unccessfully");
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
          <h1 className="mt-4">Edit Data Obat dan Tindakan</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">odt</li>
            <li className="breadcrumb-item active">edit data odt</li>
          </ol>

          <div className="card-body">
            <form action="">
              <div className="row">
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">
                      Nama
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputNama"
                      placeholder="odtDetail.nama_odt"
                      value={datas.nama_odt}
                      onChange={(e) =>
                        setDatas({ ...datas, nama_odt: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputType" className="form-label">
                      Tipe
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="inputContact"
                      placeholder={odtDetail.tipe_odt}
                      value={datas.tipe_odt}
                      onChange={(e) =>
                        setDatas({ ...datas, tipe_odt: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-sm-6 mb-4">
                  <div className="mb-3">
                    <label htmlFor="inputPrice" className="form-label">
                      Harga
                    </label>
                    <input
                      type="textarea"
                      className="form-control"
                      id="inputAddress"
                      placeholder={odtDetail.harga_odt}
                      value={datas.harga_odt}
                      onChange={(e) =>
                        setDatas({ ...datas, harga_odt: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </form>
            <Button
              type="button"
              onClickButton={onSubmit}
              className={["btn btn-primary"]}
            >
              Submit
            </Button>
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
