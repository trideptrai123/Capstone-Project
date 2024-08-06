import {
    Button,
    Card,
    CardBody,
    Input,
    Label,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHeader,
    TableRow
} from "@windmill/react-ui";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { univerApi } from "../../api/univerApi";
import { ButtonIcon } from "../../components/ButtonCustom";
import SelectCity from "../../components/ListCity";
import PageTitle from "../../components/Typography/PageTitle";
import { handleErrorHttp } from "../../error/HttpError";
import { AddIcon } from "../../icons";

const resultsPerPage = 10;

const ListUniversities = () => {
  const history = useHistory();
  const [universities, setUniversities] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [textSearch, setTextSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchUniversities();
  }, []);

  useEffect(() => {
    setData(
      universities.slice((page - 1) * resultsPerPage, page * resultsPerPage)
    );
  }, [page, universities]);

  const fetchUniversities = async () => {
    try {
      const response = await univerApi.getAllUniver({
        name: textSearch,
        city: cityFilter,
      });
      setUniversities(response.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
      message.error("Lỗi khi lấy danh sách trường đại học");
    }
  };

  const handleSearch = () => {
    fetchUniversities();
  };

  const totalResults = universities.length;

  const onPageChange = (p) => {
    setPage(p);
  };

  const handleDeleteUni = async(id) => {
    try {
        await univerApi.deleleUniver(id);
        message.success("Đã xóa")
    fetchUniversities()
        
    } catch (error) {
        handleErrorHttp(error)
    }
  }
  return (
    <div>
      <PageTitle>Danh sách trường đại học</PageTitle>
      <Button
          className="my-3"
           onClick={() => history.push("add-university")}
          size="small"
          iconLeft={AddIcon}
        >
          Thêm trường đại học
        </Button>
      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex items-end">
            <Label className="mr-4">
              <div className="text-gray-200 mb-2">Tên trường</div>
              <Input
                style={{ width: 300 }}
                placeholder="Nhập tên trường"
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
              />
            </Label>

            <Label className="mr-4">
              <div className="text-gray-200 mb-2">Thành phố</div>
              <SelectCity
                city={cityFilter}
                setCity={(city) => setCityFilter(city)}
                className=""
              >
                <option value="">Tất cả</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </SelectCity>
            </Label>

            <Button className="ml-2" onClick={handleSearch} size="regular">
              Tìm kiếm
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card className="mb-8 shadow-md">
        <CardBody>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Logo</TableCell>

                  <TableCell>Tên trường</TableCell>
                  <TableCell>Thành phố</TableCell>
                  <TableCell>Năm thành lập</TableCell>
                  <TableCell>Xếp hạng quốc gia</TableCell>
                  <TableCell>Hành động</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data?.reverse()?.map((university, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <img
                        style={{
                          borderRadius: 50,
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                        }}
                        src={university.logo || "/avt.png"}
                        alt="logo"
                      />
                    </TableCell>
                    <TableCell>
                      <Link  className="hover:text-indigo-500"
                        to={`/app/detail-university/${university._id}`}>
                      <span className="text-sm">{university.name}</span></Link>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{university.city}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {university.establishedYear}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {university.nationalRanking}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <ButtonIcon
                          onClick={() =>
                            history.push("edit-university/" + university._id)
                          }
                          svg={"/edit.svg"}
                          tooltip="Chỉnh sửa"
                        />
                        <ButtonIcon onClick={() => handleDeleteUni(university._id)} svg={"/delete.svg"} tooltip="Xóa" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}
            />
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
};

export default ListUniversities;
