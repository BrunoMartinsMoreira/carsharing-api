interface ICreateRentalDTO {
  car_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  expected_return_date: string;
  total: number;
}

export { ICreateRentalDTO };
