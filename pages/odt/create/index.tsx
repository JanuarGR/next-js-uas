import Button from "@/components/atoms/Button";
import Layout from "@/components/organisms/Layout";
import { odtType } from "@/services/data-types/odt-type";
import { odtServiceStore } from "@/services/odt-service";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Createodt() {
  const router = useRouter();
  const [datas, setDatas] = useState<odtType>({
    nama_odt: "",
    tipe_odt: "",
    harga_odt: "",
  });
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

      const response = await odtServiceStore(data);

      if (!response.error) {
        alert("odt Data created unccessfully");
        router.push("/");
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
          <h1 className="mt-4">Tambah Data Obat dan Tindakan</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">odt</li>
            <li className="breadcrumb-item active">tambah data odt</li>
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
                      placeholder="Nama"
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
                      type="text"
                      className="form-control"
                      id="inputType"
                      placeholder="Tipe"
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
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="Harga"
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
