import DonationForm from "../components/DonationForm"

const Donate = ({ addDonation }) => {
  return (
    <section className="page-section">
      <DonationForm addDonation={addDonation} />
    </section>
  )
}

export default Donate
